'use client';

import { useMemo, useRef, useState } from 'react';

const TRUST_TEXT = '100% Secure: Your financial data never leaves your browser.';
const ACCOUNT_NAME = 'Checking';

function normalizeDate(dtPosted = '') {
  const raw = dtPosted.trim();
  if (!raw) return '';

  const digits = raw.replace(/[^0-9]/g, '');
  const year = digits.slice(0, 4);
  const month = digits.slice(4, 6);
  const day = digits.slice(6, 8);

  if (!year || !month || !day) return '';
  return `${month}/${day}/${year}`;
}

function mapTxnType(amount) {
  return Number(amount) < 0 ? 'CHECK' : 'DEPOSIT';
}

function cleanText(value = '') {
  return value.replace(/[\t\r\n]+/g, ' ').trim();
}

function parseOfxTransactions(qboText = '') {
  const transactions = [];
  const blockRegex = /<STMTTRN>([\s\S]*?)<\/STMTTRN>/gi;
  let blockMatch;

  while ((blockMatch = blockRegex.exec(qboText)) !== null) {
    const block = blockMatch[1];
    const getTag = (tag) => {
      const tagRegex = new RegExp(`<${tag}>([^<\\r\\n]+)`, 'i');
      return (block.match(tagRegex)?.[1] || '').trim();
    };

    const date = normalizeDate(getTag('DTPOSTED'));
    const amountRaw = getTag('TRNAMT');
    const amount = Number(amountRaw);
    const name = cleanText(getTag('NAME')) || 'Bank Transaction';
    const memo = cleanText(getTag('MEMO'));

    if (!date || Number.isNaN(amount)) {
      continue;
    }

    transactions.push({
      date,
      amount,
      type: mapTxnType(amount),
      name,
      memo,
    });
  }

  return transactions;
}

export function convertQBOtoIIF(qboText) {
  const transactions = parseOfxTransactions(qboText);

  if (!transactions.length) {
    throw new Error('No valid transactions were found in this QBO file.');
  }

  const lines = [
    '!TRNS\tTRNSID\tTRNSTYPE\tDATE\tACCNT\tNAME\tAMOUNT\tMEMO',
    '!ENDTRNS',
  ];

  transactions.forEach((txn, index) => {
    lines.push(
      `TRNS\t${index + 1}\t${txn.type}\t${txn.date}\t${ACCOUNT_NAME}\t${txn.name}\t${txn.amount.toFixed(2)}\t${txn.memo}`
    );
    lines.push('ENDTRNS');
  });

  return {
    iifText: lines.join('\n'),
    count: transactions.length,
  };
}

export default function QboToIifConverterClient() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [qboText, setQboText] = useState('');
  const [iifText, setIifText] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [transactionCount, setTransactionCount] = useState(0);

  const isBusy = status === 'parsing' || status === 'converting';
  const canConvert = !!qboText && !isBusy;
  const canDownload = status === 'ready' && !!iifText;

  const statusMessage = useMemo(() => {
    if (status === 'parsing') return 'Parsing...';
    if (status === 'converting') return 'Converting...';
    if (status === 'ready') return `Conversion complete. ${transactionCount} transactions are ready.`;
    if (status === 'error') return error;
    return 'Upload your .qbo file to begin.';
  }, [error, status, transactionCount]);

  function resetOutput() {
    setIifText('');
    setTransactionCount(0);
  }

  function readQboFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Unable to read the selected file.'));
      reader.readAsText(file);
    });
  }

  async function handleFileSelect(event) {
    const file = event?.target?.files?.[0];

    if (!file) return;

    const isQbo = file.name.toLowerCase().endsWith('.qbo');
    if (!isQbo) {
      setError('Please choose a valid .qbo file.');
      setStatus('error');
      setSelectedFile(null);
      setQboText('');
      resetOutput();
      return;
    }

    try {
      setError('');
      setStatus('parsing');
      setSelectedFile(file);
      resetOutput();

      const text = await readQboFile(file);
      if (!/<OFX>/i.test(text)) {
        throw new Error('This file does not appear to be a valid QBO/OFX document.');
      }

      setQboText(text);
      setStatus('idle');
    } catch (err) {
      setError(err.message || 'Unable to parse the QBO file.');
      setStatus('error');
      setSelectedFile(null);
      setQboText('');
      resetOutput();
    }
  }

  function triggerFilePicker() {
    fileInputRef.current?.click();
  }

  function onDragOver(event) {
    event.preventDefault();
    setDragActive(true);
  }

  function onDragLeave(event) {
    event.preventDefault();
    setDragActive(false);
  }

  async function onDrop(event) {
    event.preventDefault();
    setDragActive(false);

    const file = event.dataTransfer?.files?.[0];
    if (!file) return;

    await handleFileSelect({ target: { files: [file] } });
  }

  function handleConvert() {
    if (!qboText || isBusy) return;

    try {
      setError('');
      setStatus('converting');
      const result = convertQBOtoIIF(qboText);
      setIifText(result.iifText);
      setTransactionCount(result.count);
      setStatus('ready');
    } catch (err) {
      setError(err.message || 'Conversion failed.');
      setStatus('error');
    }
  }

  function handleDownload() {
    if (!iifText || !selectedFile) return;

    const outputName = selectedFile.name.replace(/\.qbo$/i, '') || 'converted-statement';
    const blob = new Blob([iifText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `${outputName}.iif`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="g-px pb-12">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 md:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
            QBO to IIF File Converter
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-600 dark:text-neutral-300 md:text-base">
            Convert QBO to IIF online in seconds with client-side processing. No uploads, no account required,
            and no waiting for external servers.
          </p>
        </div>

        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`rounded-xl border-2 border-dashed p-6 text-center transition md:p-10 ${
            dragActive
              ? 'border-yellow-500 bg-yellow-50/40 dark:bg-yellow-500/10'
              : 'border-neutral-300 bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900/40'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".qbo"
            onChange={handleFileSelect}
            className="hidden"
            aria-label="Upload QBO file"
          />

          <p className="text-base font-semibold text-neutral-900 dark:text-white">Drop your .qbo file here</p>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">or click to browse files</p>

          <button
            type="button"
            onClick={triggerFilePicker}
            className="mt-5 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-semibold text-white hover:bg-neutral-700 dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-400"
          >
            Select QBO File
          </button>

          {selectedFile && (
            <p className="mt-3 text-xs font-medium text-neutral-600 dark:text-neutral-300">
              Selected: {selectedFile.name}
            </p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleConvert}
            disabled={!canConvert}
            className="rounded-lg bg-yellow-500 px-6 py-2 text-sm font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Convert to IIF
          </button>

          {canDownload && (
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-lg border border-neutral-300 px-6 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              Download IIF
            </button>
          )}
        </div>

        <div className="mt-5 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900/50">
          <p
            className={`font-medium ${
              status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-neutral-700 dark:text-neutral-200'
            }`}
          >
            {statusMessage}
          </p>
        </div>

        <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
          {TRUST_TEXT}
        </div>
      </div>
    </section>
  );
}
