'use client';

import { useMemo, useRef, useState } from 'react';

const TRUST_TEXT =
  '100% Secure: Your proprietary tuning files never leave your computer. All processing is done locally in your browser.';

function parseHexByte(value, label) {
  const parsed = Number.parseInt(value, 16);
  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid ${label} in Intel HEX record.`);
  }
  return parsed;
}

function parseXmlXcal(xcalText) {
  const memory = new Map();
  let highestAddress = -1;

  const parser = new DOMParser();
  const doc = parser.parseFromString(xcalText, 'text/xml');

  if (doc.getElementsByTagName('parsererror').length > 0) {
    throw new Error('Invalid XML format in XCAL file.');
  }

  // Parse Parameter elements
  const parameters = doc.getElementsByTagName('Parameter');
  for (let i = 0; i < parameters.length; i += 1) {
    const param = parameters[i];
    const offset = param.getAttribute('offset');
    const type = param.getAttribute('type') || 'uint8';
    const value = param.getAttribute('value');

    if (!offset || !value) continue;

    const address = parseInt(offset, 16);
    const numValue = parseInt(value, 10);

    if (type === 'uint8' || type === 'byte') {
      memory.set(address, numValue & 0xff);
      highestAddress = Math.max(highestAddress, address);
    } else if (type === 'uint16' || type === 'word') {
      memory.set(address, (numValue >> 8) & 0xff);
      memory.set(address + 1, numValue & 0xff);
      highestAddress = Math.max(highestAddress, address + 1);
    } else if (type === 'uint32' || type === 'dword') {
      memory.set(address, (numValue >> 24) & 0xff);
      memory.set(address + 1, (numValue >> 16) & 0xff);
      memory.set(address + 2, (numValue >> 8) & 0xff);
      memory.set(address + 3, numValue & 0xff);
      highestAddress = Math.max(highestAddress, address + 3);
    }
  }

  // Parse Table elements
  const tables = doc.getElementsByTagName('Table');
  for (let i = 0; i < tables.length; i += 1) {
    const table = tables[i];
    const offset = table.getAttribute('offset');
    const type = table.getAttribute('type') || 'uint8';
    const valuesText = table.getElementsByTagName('Values')[0]?.textContent || '';
    const values = valuesText.split(',').map(v => parseInt(v.trim(), 10)).filter(v => !isNaN(v));

    if (!offset || values.length === 0) continue;

    let address = parseInt(offset, 16);

    for (const numValue of values) {
      if (type === 'uint8' || type === 'byte') {
        memory.set(address, numValue & 0xff);
        address += 1;
      } else if (type === 'uint16' || type === 'word') {
        memory.set(address, (numValue >> 8) & 0xff);
        memory.set(address + 1, numValue & 0xff);
        address += 2;
      } else if (type === 'uint32' || type === 'dword') {
        memory.set(address, (numValue >> 24) & 0xff);
        memory.set(address + 1, (numValue >> 16) & 0xff);
        memory.set(address + 2, (numValue >> 8) & 0xff);
        memory.set(address + 3, numValue & 0xff);
        address += 4;
      }
    }

    highestAddress = Math.max(highestAddress, address - 1);
  }

  return { memory, highestAddress };
}

function parseIntelHex(xcalText) {
  const lines = xcalText.split(/\r?\n/);
  const memory = new Map();
  let upperAddress = 0;
  let highestAddress = -1;

  for (const rawLine of lines) {
    const line = rawLine.trim();

    // Ignore metadata and non-Intel HEX lines.
    if (!line.startsWith(':')) {
      continue;
    }

    if (line.length < 11) {
      throw new Error('Malformed Intel HEX line encountered.');
    }

    const byteCount = parseHexByte(line.slice(1, 3), 'byte count');
    const baseAddress = parseHexByte(line.slice(3, 7), 'address');
    const recordType = parseHexByte(line.slice(7, 9), 'record type');
    const dataStart = 9;
    const dataEnd = dataStart + byteCount * 2;

    if (line.length < dataEnd + 2) {
      throw new Error('Intel HEX line is shorter than declared byte count.');
    }

    const dataHex = line.slice(dataStart, dataEnd);

    if (recordType === 0x00) {
      for (let i = 0; i < byteCount; i += 1) {
        const value = parseHexByte(dataHex.slice(i * 2, i * 2 + 2), 'data byte');
        const absoluteAddress = upperAddress + baseAddress + i;
        memory.set(absoluteAddress, value);
        if (absoluteAddress > highestAddress) {
          highestAddress = absoluteAddress;
        }
      }
      continue;
    }

    if (recordType === 0x01) {
      // End Of File record.
      break;
    }

    if (recordType === 0x04) {
      if (byteCount !== 2) {
        throw new Error('Invalid Extended Linear Address record.');
      }
      const segment = parseHexByte(dataHex, 'extended linear address');
      upperAddress = segment << 16;
      continue;
    }

    if (recordType === 0x02) {
      if (byteCount !== 2) {
        throw new Error('Invalid Extended Segment Address record.');
      }
      const segment = parseHexByte(dataHex, 'extended segment address');
      upperAddress = segment << 4;
    }
  }

  return { memory, highestAddress };
}

export function convertXcalToBin(xcalText) {
  let memory;
  let highestAddress;
  let lowestAddress = Number.POSITIVE_INFINITY;

  // Detect format: XML or Intel HEX
  const isXml = xcalText.trim().startsWith('<');

  try {
    if (isXml) {
      const result = parseXmlXcal(xcalText);
      memory = result.memory;
      highestAddress = result.highestAddress;
    } else {
      const result = parseIntelHex(xcalText);
      memory = result.memory;
      highestAddress = result.highestAddress;
    }
  } catch (err) {
    throw err;
  }

  if (highestAddress < 0 || memory.size === 0) {
    throw new Error('No calibration data records were found in this XCAL file.');
  }

  for (const address of memory.keys()) {
    if (address < lowestAddress) {
      lowestAddress = address;
    }
  }

  // Sparse maps are intentionally padded from address 0x00000000 up to the highest populated address.
  // This guarantees BIN output includes leading 0x00 bytes when the first defined parameter starts later.
  const output = new Uint8Array(highestAddress + 1);
  for (const [address, value] of memory.entries()) {
    output[address] = value;
  }

  return {
    binary: output,
    byteLength: output.byteLength,
    recordCount: memory.size,
    lowestDefinedOffset: Number.isFinite(lowestAddress) ? lowestAddress : 0,
    paddedLeadingBytes: Number.isFinite(lowestAddress) ? lowestAddress : 0,
  };
}

export default function XcalToBinConverterClient() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [xcalText, setXcalText] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [binaryOutput, setBinaryOutput] = useState(null);
  const [byteLength, setByteLength] = useState(0);

  const isBusy = status === 'reading' || status === 'compiling';
  const canConvert = !!xcalText && !isBusy;
  const canDownload = status === 'ready' && !!binaryOutput;

  const statusMessage = useMemo(() => {
    if (status === 'reading') return 'Reading Hex Records...';
    if (status === 'compiling') return 'Compiling Binary...';
    if (status === 'ready') return `Conversion complete. Output size: ${byteLength.toLocaleString()} bytes.`;
    if (status === 'error') return error;
    return 'Upload your .xcal file to begin conversion.';
  }, [byteLength, error, status]);

  function resetOutput() {
    setBinaryOutput(null);
    setByteLength(0);
  }

  function readXcalFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error('Unable to read the selected XCAL file.'));
      reader.readAsText(file);
    });
  }

  async function handleFileSelect(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const validExtension = file.name.toLowerCase().endsWith('.xcal');
    if (!validExtension) {
      setSelectedFile(null);
      setXcalText('');
      resetOutput();
      setError('Please select a valid .xcal tuning file.');
      setStatus('error');
      return;
    }

    try {
      setError('');
      setStatus('reading');
      setSelectedFile(file);
      resetOutput();

      const text = await readXcalFile(file);
      const isXml = text.trim().startsWith('<');
      const hasHex = /:/m.test(text);

      if (!isXml && !hasHex) {
        throw new Error('File does not appear to be a valid XCAL file (neither XML nor Intel HEX format).');
      }

      setXcalText(text);
      setStatus('idle');
    } catch (err) {
      setSelectedFile(null);
      setXcalText('');
      resetOutput();
      setError(err.message || 'Failed to parse XCAL file.');
      setStatus('error');
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
    if (!xcalText || isBusy) return;

    try {
      setError('');
      setStatus('compiling');
      const result = convertXcalToBin(xcalText);
      setBinaryOutput(result.binary);
      setByteLength(result.byteLength);
      setStatus('ready');
    } catch (err) {
      setBinaryOutput(null);
      setByteLength(0);
      setError(err.message || 'Conversion failed.');
      setStatus('error');
    }
  }

  function handleDownload() {
    if (!binaryOutput || !selectedFile) return;

    const outputName = selectedFile.name.replace(/\.xcal$/i, '') || 'converted-calibration';
    const blob = new Blob([binaryOutput], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `${outputName}.bin`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="g-px pb-12 pt-2">
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 p-6 shadow-[0_0_0_1px_rgba(234,179,8,0.15)] md:p-8">
        <div className="mb-7">
          <p className="inline-flex rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-yellow-300">
            Cummins Calibration Utility
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            XCAL to BIN File Converter
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
            Convert XCAL Intel HEX calibration files into raw BIN format instantly in your browser. Built for
            diesel tuners and workshop workflows that require fast, offline-friendly conversion.
          </p>
        </div>

        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`rounded-xl border-2 border-dashed p-6 text-center transition md:p-10 ${
            dragActive
              ? 'border-yellow-400 bg-yellow-500/10'
              : 'border-zinc-600 bg-zinc-900/70'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xcal"
            onChange={handleFileSelect}
            className="hidden"
            aria-label="Upload XCAL file"
          />

          <p className="text-base font-semibold text-zinc-100">Drop your .xcal file here</p>
          <p className="mt-2 text-sm text-zinc-400">or click below to browse your calibration file</p>

          <button
            type="button"
            onClick={triggerFilePicker}
            className="mt-5 rounded-lg bg-yellow-400 px-5 py-2 text-sm font-bold text-zinc-950 transition hover:bg-yellow-300"
          >
            Select XCAL File
          </button>

          {selectedFile && (
            <p className="mt-3 text-xs font-medium text-zinc-300">Selected: {selectedFile.name}</p>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleConvert}
            disabled={!canConvert}
            className="rounded-lg bg-white px-6 py-2 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Convert to BIN
          </button>

          {canDownload && (
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-lg border border-zinc-600 px-6 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700"
            >
              Download .BIN
            </button>
          )}
        </div>

        <div className="mt-5 rounded-lg border border-zinc-700 bg-zinc-900 p-4 text-sm">
          <p className={`font-medium ${status === 'error' ? 'text-red-400' : 'text-zinc-200'}`}>{statusMessage}</p>
        </div>

        <div className="mt-5 rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-200">
          {TRUST_TEXT}
        </div>
      </div>
    </section>
  );
}
