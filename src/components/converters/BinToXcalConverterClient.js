'use client';

import { useMemo, useRef, useState } from 'react';

const TRUST_TEXT =
  '100% Secure: Your proprietary tuning files never leave your computer. All processing is done locally in your browser.';

const PRESET_CONFIG = {
  beginner: {
    label: 'Beginner',
    silenceThreshold: 16,
    knownRangesInput: '',
    note: 'Recommended for most users. Keep output clean with safe defaults.',
  },
  standard: {
    label: 'Standard',
    silenceThreshold: 12,
    knownRangesInput: '',
    note: 'Moderate cleanup for sparser files while keeping important transitions.',
  },
  advanced: {
    label: 'Advanced',
    silenceThreshold: 8,
    knownRangesInput: '',
    note: 'More aggressive inclusion. Best when you understand map structure.',
  },
};

function findDefinedRuns(binaryData, silenceThreshold = 16, knownRanges = []) {
  const runs = [];
  let runStart = -1;

  const isInKnownRange = (address) => {
    for (const range of knownRanges) {
      const start = Number(range?.start);
      const end = Number(range?.end);
      if (Number.isFinite(start) && Number.isFinite(end) && address >= start && address <= end) {
        return true;
      }
    }
    return false;
  };

  const isSilentByte = (byte, address) => {
    if (isInKnownRange(address)) {
      return false;
    }
    return byte === 0x00 || byte === 0xff;
  };

  let silentCount = 0;
  for (let i = 0; i < binaryData.length; i += 1) {
    const silent = isSilentByte(binaryData[i], i);

    if (!silent) {
      if (runStart === -1) {
        runStart = i;
      }
      silentCount = 0;
      continue;
    }

    if (runStart !== -1) {
      silentCount += 1;
      if (silentCount >= silenceThreshold) {
        const runEnd = i - silenceThreshold;
        if (runEnd >= runStart) {
          runs.push({ start: runStart, end: runEnd });
        }
        runStart = -1;
        silentCount = 0;
      }
    }
  }

  if (runStart !== -1) {
    runs.push({ start: runStart, end: binaryData.length - 1 });
  }

  return runs;
}

function parseKnownRangesInput(inputText) {
  if (!inputText?.trim()) {
    return [];
  }

  return inputText
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [rawStart, rawEnd] = part.split('-').map((v) => v.trim());
      if (!rawStart || !rawEnd) {
        throw new Error('Invalid known range format. Use comma-separated ranges like 0x1000-0x10FF.');
      }

      const start = Number.parseInt(rawStart.replace(/^0x/i, ''), 16);
      const end = Number.parseInt(rawEnd.replace(/^0x/i, ''), 16);
      if (!Number.isFinite(start) || !Number.isFinite(end)) {
        throw new Error('Known ranges must be valid hexadecimal values. Example: 0x1000-0x10FF');
      }

      return {
        start: Math.min(start, end),
        end: Math.max(start, end),
      };
    });
}

function binToIntelHex(binaryData, silenceThreshold = 16, knownRanges = []) {
  const lines = [];
  const bytesPerLine = 16;
  let lastUpperAddress = -1;
  const runs = findDefinedRuns(binaryData, silenceThreshold, knownRanges);

  if (runs.length === 0) {
    throw new Error('No non-silent calibration data found above the selected silence threshold.');
  }

  for (const run of runs) {
    let currentAddress = run.start;

    while (currentAddress <= run.end) {
      const upperAddress = (currentAddress >> 16) & 0xffff;

      if (upperAddress !== lastUpperAddress) {
        const upperAddressHex = upperAddress.toString(16).padStart(4, '0').toUpperCase();
        const checksumEla =
          (0x100 -
            ((0x02 + 0x00 + 0x00 + 0x04 +
              Number.parseInt(upperAddressHex.slice(0, 2), 16) +
              Number.parseInt(upperAddressHex.slice(2), 16)) &
              0xff)) &
          0xff;
        lines.push(`:02000004${upperAddressHex}${checksumEla.toString(16).padStart(2, '0').toUpperCase()}`);
        lastUpperAddress = upperAddress;
      }

      const bytesThisLine = Math.min(bytesPerLine, run.end - currentAddress + 1);
      const dataBytes = [];
      for (let i = 0; i < bytesThisLine; i += 1) {
        dataBytes.push(binaryData[currentAddress + i]);
      }

      const address = currentAddress & 0xffff;
      const addressHex = address.toString(16).padStart(4, '0').toUpperCase();
      const dataHex = dataBytes.map((b) => b.toString(16).padStart(2, '0').toUpperCase()).join('');

      const sumBytes = [bytesThisLine, (address >> 8) & 0xff, address & 0xff, 0x00, ...dataBytes];
      const checksum = (0x100 - (sumBytes.reduce((a, b) => a + b, 0) & 0xff)) & 0xff;

      lines.push(
        `:${bytesThisLine.toString(16).padStart(2, '0').toUpperCase()}${addressHex}00${dataHex}${checksum
          .toString(16)
          .padStart(2, '0')
          .toUpperCase()}`
      );

      currentAddress += bytesThisLine;
    }
  }

  lines.push(':00000001FF');
  return lines.join('\n');
}

function binToXmlXcal(binaryData, silenceThreshold = 16, knownRanges = []) {
  const runs = findDefinedRuns(binaryData, silenceThreshold, knownRanges);

  if (runs.length === 0) {
    throw new Error('No non-silent calibration data found above the selected silence threshold.');
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<Calibration>\n';
  xml += '    <!-- Auto-converted from BIN file -->\n';
  xml += `    <!-- Silence threshold: ${silenceThreshold} consecutive bytes of 0x00/0xFF are skipped -->\n`;
  xml += '    <!-- Note: Parameter names are inferred from memory layout and should be reviewed -->\n\n';

  let paramIndex = 1;
  for (const run of runs) {
    for (let address = run.start; address <= run.end; address += 2) {
      const offset = address.toString(16).toUpperCase().padStart(4, '0');
      if (address + 1 <= run.end) {
        const val16 = (binaryData[address] << 8) | binaryData[address + 1];
        xml += `    <Parameter name="Param_${paramIndex}" offset="0x${offset}" type="uint16" value="${val16}" />\n`;
      } else {
        const val8 = binaryData[address];
        xml += `    <Parameter name="Param_${paramIndex}" offset="0x${offset}" type="uint8" value="${val8}" />\n`;
      }
      paramIndex += 1;
    }
  }

  const firstRun = runs[0];
  if (firstRun) {
    xml += '\n    <!-- Data Table (sample from first non-silent region) -->\n';
    xml += `    <Table name="Data_Table" offset="0x${firstRun.start.toString(16).toUpperCase().padStart(4, '0')}" type="uint8">\n`;
    xml += '        <Values>';
    const sampleValues = [];
    const sampleEnd = Math.min(firstRun.end, firstRun.start + 15);
    for (let i = firstRun.start; i <= sampleEnd; i += 1) {
      sampleValues.push(binaryData[i]);
    }
    xml += sampleValues.join(', ');
    xml += '</Values>\n';
    xml += '    </Table>\n';
  }

  xml += '</Calibration>';
  return xml;
}

export function convertBinToXcal(binaryData, format, options = {}) {
  const silenceThreshold = Math.max(1, Number(options.silenceThreshold) || 16);
  const knownRanges = Array.isArray(options.knownRanges) ? options.knownRanges : [];

  if (format === 'hex') {
    return {
      output: binToIntelHex(binaryData, silenceThreshold, knownRanges),
      filename: 'converted.xcal',
      mimeType: 'text/plain',
    };
  }

  if (format === 'xml') {
    return {
      output: binToXmlXcal(binaryData, silenceThreshold, knownRanges),
      filename: 'converted.xcal',
      mimeType: 'text/xml',
    };
  }

  throw new Error('Invalid format specified.');
}

export default function BinToXcalConverterClient() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [binaryData, setBinaryData] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [outputFormat, setOutputFormat] = useState('hex');
  const [preset, setPreset] = useState('beginner');
  const [silenceThreshold, setSilenceThreshold] = useState(16);
  const [knownRangesInput, setKnownRangesInput] = useState('');
  const [convertedOutput, setConvertedOutput] = useState(null);

  const isBusy = status === 'reading' || status === 'compiling';
  const canConvert = !!binaryData && !isBusy;
  const canDownload = status === 'ready' && !!convertedOutput;

  const statusMessage = useMemo(() => {
    if (status === 'reading') return 'Reading Binary File...';
    if (status === 'compiling') return 'Converting to XCAL...';
    if (status === 'ready') {
      return `Conversion complete. Output size: ${convertedOutput?.output?.length?.toLocaleString() || 0} bytes.`;
    }
    if (status === 'error') return error;
    return 'Upload your .bin file to begin conversion.';
  }, [convertedOutput, error, status]);

  function resetOutput() {
    setConvertedOutput(null);
  }

  function readBinFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const arrayBuffer = reader.result;
        resolve(new Uint8Array(arrayBuffer));
      };
      reader.onerror = () => reject(new Error('Unable to read the selected BIN file.'));
      reader.readAsArrayBuffer(file);
    });
  }

  async function handleFileSelect(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;

    const validExtension = file.name.toLowerCase().endsWith('.bin');
    if (!validExtension) {
      setSelectedFile(null);
      setBinaryData(null);
      resetOutput();
      setError('Please select a valid .bin binary file.');
      setStatus('error');
      return;
    }

    try {
      setError('');
      setStatus('reading');
      setSelectedFile(file);
      resetOutput();

      const data = await readBinFile(file);
      if (data.length === 0) {
        throw new Error('BIN file is empty.');
      }

      setBinaryData(data);
      setStatus('idle');
    } catch (err) {
      setSelectedFile(null);
      setBinaryData(null);
      resetOutput();
      setError(err.message || 'Failed to read BIN file.');
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
    if (!binaryData || isBusy) return;

    try {
      setError('');
      setStatus('compiling');
      const knownRanges = parseKnownRangesInput(knownRangesInput);
      const result = convertBinToXcal(binaryData, outputFormat, { silenceThreshold, knownRanges });
      setConvertedOutput(result);
      setStatus('ready');
    } catch (err) {
      setConvertedOutput(null);
      setError(err.message || 'Conversion failed.');
      setStatus('error');
    }
  }

  function applyPreset(nextPreset) {
    const config = PRESET_CONFIG[nextPreset];
    if (!config) return;
    setPreset(nextPreset);
    setSilenceThreshold(config.silenceThreshold);
    setKnownRangesInput(config.knownRangesInput);
  }

  function handleDownload() {
    if (!convertedOutput || !selectedFile) return;

    const outputName = selectedFile.name.replace(/\.bin$/i, '') || 'converted';
    const blob = new Blob([convertedOutput.output], { type: convertedOutput.mimeType });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `${outputName}.xcal`;
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
            BIN to XCAL File Converter
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-300 md:text-base">
            Convert binary calibration files (.BIN) back into XCAL format instantly in your browser. Choose between
            Intel HEX or XML format output.
          </p>
        </div>

        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`rounded-xl border-2 border-dashed p-6 text-center transition md:p-10 ${
            dragActive ? 'border-yellow-400 bg-yellow-500/10' : 'border-zinc-600 bg-zinc-900/70'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".bin"
            onChange={handleFileSelect}
            className="hidden"
            aria-label="Upload BIN file"
          />

          <p className="text-base font-semibold text-zinc-100">Drop your .bin file here</p>
          <p className="mt-2 text-sm text-zinc-400">or click below to browse your binary calibration file</p>

          <button
            type="button"
            onClick={triggerFilePicker}
            className="mt-5 rounded-lg bg-yellow-400 px-5 py-2 text-sm font-bold text-zinc-950 transition hover:bg-yellow-300"
          >
            Select BIN File
          </button>

          {selectedFile && <p className="mt-3 text-xs font-medium text-zinc-300">Selected: {selectedFile.name}</p>}
        </div>

        <div className="mt-5 rounded-lg border border-zinc-700 bg-zinc-900/70 p-4">
          <p className="text-sm font-semibold text-zinc-100">Recommended Defaults</p>
          <p className="mt-1 text-xs text-zinc-400">
            Presets are optional. Pick one, then adjust Silence Threshold or Known Map Ranges if needed.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.entries(PRESET_CONFIG).map(([key, cfg]) => (
              <button
                key={key}
                type="button"
                onClick={() => applyPreset(key)}
                disabled={isBusy}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  preset === key
                    ? 'bg-yellow-400 text-zinc-950'
                    : 'border border-zinc-600 bg-zinc-800 text-zinc-100 hover:bg-zinc-700'
                } disabled:opacity-60`}
              >
                {cfg.label}
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-zinc-400">{PRESET_CONFIG[preset].note}</p>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <div className="flex items-center gap-3">
            <label htmlFor="format-select" className="text-sm font-semibold text-zinc-100">
              Output Format:
            </label>
            <select
              id="format-select"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
              disabled={isBusy}
              className="rounded-lg border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm text-zinc-100 transition hover:border-zinc-500 disabled:opacity-60"
            >
              <option value="hex">Intel HEX Format</option>
              <option value="xml">XML Format</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label htmlFor="silence-threshold" className="text-sm font-semibold text-zinc-100">
              Silence Threshold:
            </label>
            <input
              id="silence-threshold"
              type="number"
              min={1}
              max={4096}
              value={silenceThreshold}
              onChange={(e) =>
                setSilenceThreshold(Math.max(1, Number.parseInt(e.target.value || '1', 10) || 1))
              }
              disabled={isBusy}
              className="w-24 rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 transition hover:border-zinc-500 disabled:opacity-60"
            />
          </div>

          <div className="flex w-full max-w-xl items-center gap-3">
            <label htmlFor="known-ranges" className="text-sm font-semibold text-zinc-100">
              Known Map Ranges:
            </label>
            <input
              id="known-ranges"
              type="text"
              value={knownRangesInput}
              onChange={(e) => setKnownRangesInput(e.target.value)}
              disabled={isBusy}
              placeholder="0x1000-0x10FF, 0x2000-0x20AF"
              className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 transition hover:border-zinc-500 disabled:opacity-60"
            />
          </div>

          <button
            type="button"
            onClick={handleConvert}
            disabled={!canConvert}
            className="rounded-lg bg-white px-6 py-2 text-sm font-bold text-zinc-950 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Convert to XCAL
          </button>

          {canDownload && (
            <button
              type="button"
              onClick={handleDownload}
              className="rounded-lg border border-zinc-600 px-6 py-2 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700"
            >
              Download .XCAL
            </button>
          )}
        </div>

        <div className="mt-5 rounded-lg border border-zinc-700 bg-zinc-900 p-4 text-sm">
          <p className={`font-medium ${status === 'error' ? 'text-red-400' : 'text-zinc-200'}`}>{statusMessage}</p>
        </div>

        <p className="mt-3 text-xs text-zinc-400">
          Silence Threshold controls how many consecutive 0x00/0xFF bytes are treated as sparse filler and skipped.
        </p>

        <p className="mt-1 text-xs text-zinc-400">
          Known Map Ranges keep sparse bytes inside important offsets. Format: 0xSTART-0xEND, separated by commas.
        </p>

        <div className="mt-5 rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-200">
          {TRUST_TEXT}
        </div>
      </div>
    </section>
  );
}
