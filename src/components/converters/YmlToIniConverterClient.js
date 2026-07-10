'use client';

import { useMemo, useRef, useState } from 'react';

const TRUST_TEXT = '100% Secure: Your server configurations never leave your browser.';

function isPlainObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

function formatIniValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return Number.isFinite(value) ? String(value) : '';
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map((item) => formatIniValue(item)).join(',');
  return JSON.stringify(value);
}

function flattenObject(objectValue, parentKey = '') {
  const entries = [];

  Object.entries(objectValue).forEach(([key, value]) => {
    const nextKey = parentKey ? `${parentKey}.${key}` : key;

    if (isPlainObject(value)) {
      entries.push(...flattenObject(value, nextKey));
      return;
    }

    if (Array.isArray(value)) {
      if (value.every((item) => !isPlainObject(item) && !Array.isArray(item))) {
        entries.push([nextKey, formatIniValue(value)]);
        return;
      }

      value.forEach((item, index) => {
        const arrayKey = `${nextKey}.${index}`;
        if (isPlainObject(item)) {
          entries.push(...flattenObject(item, arrayKey));
        } else if (Array.isArray(item)) {
          entries.push([arrayKey, formatIniValue(item)]);
        } else {
          entries.push([arrayKey, formatIniValue(item)]);
        }
      });
      return;
    }

    entries.push([nextKey, formatIniValue(value)]);
  });

  return entries;
}

export function convertToINI(yamlString) {
  const parser = typeof window !== 'undefined' ? window.jsyaml : null;

  if (!parser || typeof parser.load !== 'function') {
    throw new Error('YAML parser is still loading. Please wait a moment and try again.');
  }

  if (!yamlString.trim()) {
    return '';
  }

  const parsed = parser.load(yamlString);

  if (parsed === null || parsed === undefined) {
    return '';
  }

  if (!isPlainObject(parsed)) {
    throw new Error('Top-level YAML must be an object with key/value pairs.');
  }

  const globalPairs = [];
  const sectionBlocks = [];

  Object.entries(parsed).forEach(([topKey, topValue]) => {
    if (isPlainObject(topValue)) {
      const sectionPairs = flattenObject(topValue);
      const sectionLines = sectionPairs.map(([key, value]) => `${key}=${value}`);
      sectionBlocks.push(`[${topKey}]\n${sectionLines.join('\n')}`);
      return;
    }

    if (Array.isArray(topValue)) {
      if (topValue.every((item) => !isPlainObject(item) && !Array.isArray(item))) {
        globalPairs.push([topKey, formatIniValue(topValue)]);
        return;
      }

      topValue.forEach((item, index) => {
        if (isPlainObject(item)) {
          const sectionName = `${topKey}.${index}`;
          const sectionPairs = flattenObject(item);
          const sectionLines = sectionPairs.map(([key, value]) => `${key}=${value}`);
          sectionBlocks.push(`[${sectionName}]\n${sectionLines.join('\n')}`);
        } else {
          globalPairs.push([`${topKey}.${index}`, formatIniValue(item)]);
        }
      });
      return;
    }

    globalPairs.push([topKey, formatIniValue(topValue)]);
  });

  const globalLines = globalPairs.map(([key, value]) => `${key}=${value}`);
  const parts = [];

  if (globalLines.length) {
    parts.push(globalLines.join('\n'));
  }
  if (sectionBlocks.length) {
    parts.push(sectionBlocks.join('\n\n'));
  }

  return parts.join('\n\n').trim();
}

export default function YmlToIniConverterClient() {
  const fileInputRef = useRef(null);
  const [yamlInput, setYamlInput] = useState('');
  const [iniOutput, setIniOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const hasOutput = Boolean(iniOutput.trim()) && !error;

  const statusMessage = useMemo(() => {
    if (error) return error;
    if (!yamlInput.trim()) return 'Paste YAML to see INI output instantly.';
    return 'Conversion successful. Review output and copy or download.';
  }, [error, yamlInput]);

  function runConversion(sourceYaml) {
    try {
      const converted = convertToINI(sourceYaml);
      setError('');
      setIniOutput(converted || '');
    } catch (conversionError) {
      const message = conversionError?.message || 'Invalid YAML syntax.';
      setError(message);
      setIniOutput(`Error: ${message}`);
    }
  }

  function handleYamlInput(event) {
    const nextValue = event.target.value;
    setYamlInput(nextValue);
    setCopied(false);

    if (!nextValue.trim()) {
      setError('');
      setIniOutput('');
      return;
    }

    runConversion(nextValue);
  }

  async function handleFileSelect(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const isYml = /\.(yml|yaml)$/i.test(file.name);
    if (!isYml) {
      setError('Please upload a valid .yml or .yaml file.');
      setIniOutput('Error: Please upload a valid .yml or .yaml file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result || '');
      setYamlInput(text);
      runConversion(text);
    };
    reader.onerror = () => {
      setError('Failed to read the uploaded YAML file.');
      setIniOutput('Error: Failed to read the uploaded YAML file.');
    };
    reader.readAsText(file);
  }

  async function handleCopy() {
    if (!iniOutput.trim()) return;

    try {
      await navigator.clipboard.writeText(iniOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setError('Copy failed. Please copy the INI output manually.');
    }
  }

  function handleDownload() {
    if (!iniOutput.trim()) return;

    const blob = new Blob([iniOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = 'converted-config.ini';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="g-px pb-12 pt-2">
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 p-6 shadow-[0_0_0_1px_rgba(34,211,238,0.15)] md:p-8">
        <div className="mb-7">
          <p className="inline-flex rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
            Developer Config Utility
          </p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            YML to INI Converter
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
            Convert YAML configuration files to INI format instantly with local, browser-side processing.
            Built for DevOps engineers, backend teams, and config migration workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 p-4">
            <label className="mb-2 block text-sm font-semibold text-zinc-100">Paste YAML here...</label>
            <textarea
              value={yamlInput}
              onInput={handleYamlInput}
              className="h-80 w-full resize-y rounded-lg border border-zinc-700 bg-zinc-950 p-3 font-mono text-sm text-zinc-100 outline-none ring-cyan-300 placeholder:text-zinc-500 focus:ring"
              placeholder="app:\n  env: production\n  server:\n    host: 127.0.0.1\n    port: 8080"
            />
            <div className="mt-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".yml,.yaml"
                className="hidden"
                onChange={handleFileSelect}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg bg-cyan-400 px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-cyan-300"
              >
                Upload .yml File
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 p-4">
            <label className="mb-2 block text-sm font-semibold text-zinc-100">Generated INI output...</label>
            {error && (
              <p className="mb-2 rounded-md border border-red-500/60 bg-red-500/15 px-3 py-2 text-sm font-medium text-red-300">
                {error}
              </p>
            )}
            <textarea
              readOnly
              value={iniOutput}
              className={`h-80 w-full resize-y rounded-lg border p-3 font-mono text-sm outline-none ${
                error
                  ? 'border-red-500 bg-zinc-950 text-red-300'
                  : 'border-zinc-700 bg-zinc-950 text-zinc-100'
              }`}
              placeholder="Generated INI output..."
            />
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!iniOutput.trim()}
                className="rounded-lg bg-white px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!iniOutput.trim()}
                className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Download .ini
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-zinc-700 bg-zinc-900 p-4 text-sm">
          <p className={`font-medium ${error ? 'text-red-300' : 'text-zinc-200'}`}>{statusMessage}</p>
        </div>

        <div className="mt-5 rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-200">
          {TRUST_TEXT}
        </div>
      </div>
    </section>
  );
}
