'use client';

import { useMemo, useRef, useState } from 'react';

const TRUST_TEXT =
  "100% Private & Secure: For clinical and proprietary research data. Processing happens locally in your browser's memory. No data is uploaded to our servers.";

function escapeXml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function encodeFloatArrayToBase64(values) {
  const typed = new Float64Array(values);
  const bytes = new Uint8Array(typed.buffer);

  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode(...chunk);
  }

  return btoa(binary);
}

function parseCharge(raw = '') {
  const match = String(raw).match(/(\d+)/);
  if (!match) return '';
  return `${match[1]}+`;
}

function parseMgfBlocks(mgfText) {
  const spectra = [];
  const parts = mgfText.split(/BEGIN IONS/i);

  for (let i = 1; i < parts.length; i += 1) {
    const blockText = parts[i].split(/END IONS/i)[0];
    if (!blockText) continue;

    const lines = blockText
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const metadata = {
      TITLE: '',
      PEPMASS: '',
      CHARGE: '',
    };

    const mz = [];
    const intensity = [];

    lines.forEach((line) => {
      if (line.includes('=')) {
        const idx = line.indexOf('=');
        const key = line.slice(0, idx).trim().toUpperCase();
        const value = line.slice(idx + 1).trim();
        if (key in metadata) {
          metadata[key] = value;
        }
        return;
      }

      const pair = line.split(/\s+/);
      if (pair.length < 2) return;

      const mzValue = Number(pair[0]);
      const intValue = Number(pair[1]);
      if (Number.isFinite(mzValue) && Number.isFinite(intValue)) {
        mz.push(mzValue);
        intensity.push(intValue);
      }
    });

    if (!mz.length || !intensity.length) {
      continue;
    }

    spectra.push({
      title: metadata.TITLE || `Spectrum ${spectra.length + 1}`,
      pepmass: metadata.PEPMASS,
      charge: parseCharge(metadata.CHARGE),
      mz,
      intensity,
    });
  }

  return spectra;
}

function buildSpectrumXml(spectrum, index) {
  const mzEncoded = encodeFloatArrayToBase64(spectrum.mz);
  const intensityEncoded = encodeFloatArrayToBase64(spectrum.intensity);

  return `
      <spectrum index="${index}" id="scan=${index + 1}" defaultArrayLength="${spectrum.mz.length}">
        <cvParam cvRef="MS" accession="MS:1000511" name="ms level" value="2"/>
        <cvParam cvRef="MS" accession="MS:1000127" name="centroid spectrum"/>
        <cvParam cvRef="MS" accession="MS:1000796" name="spectrum title" value="${escapeXml(spectrum.title)}"/>
        ${spectrum.pepmass ? `<cvParam cvRef="MS" accession="MS:1000744" name="selected ion m/z" value="${escapeXml(spectrum.pepmass.split(/\s+/)[0])}"/>` : ''}
        ${spectrum.charge ? `<cvParam cvRef="MS" accession="MS:1000041" name="charge state" value="${escapeXml(spectrum.charge.replace('+', ''))}"/>` : ''}
        <binaryDataArrayList count="2">
          <binaryDataArray encodedLength="${mzEncoded.length}">
            <cvParam cvRef="MS" accession="MS:1000523" name="64-bit float"/>
            <cvParam cvRef="MS" accession="MS:1000576" name="no compression"/>
            <cvParam cvRef="MS" accession="MS:1000514" name="m/z array" unitCvRef="MS" unitAccession="MS:1000040" unitName="m/z"/>
            <binary>${mzEncoded}</binary>
          </binaryDataArray>
          <binaryDataArray encodedLength="${intensityEncoded.length}">
            <cvParam cvRef="MS" accession="MS:1000523" name="64-bit float"/>
            <cvParam cvRef="MS" accession="MS:1000576" name="no compression"/>
            <cvParam cvRef="MS" accession="MS:1000515" name="intensity array" unitCvRef="MS" unitAccession="MS:1000131" unitName="number of detector counts"/>
            <binary>${intensityEncoded}</binary>
          </binaryDataArray>
        </binaryDataArrayList>
      </spectrum>`;
}

export function convertMGFtoMzML(mgfText) {
  const spectra = parseMgfBlocks(mgfText);

  if (!spectra.length) {
    throw new Error('No valid spectra found. Ensure your file contains BEGIN IONS / END IONS blocks with peak pairs.');
  }

  const spectrumXml = spectra.map((spec, idx) => buildSpectrumXml(spec, idx)).join('\n');

  const mzml = `<?xml version="1.0" encoding="UTF-8"?>
<mzML xmlns="http://psi.hupo.org/ms/mzml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.1.0" xsi:schemaLocation="http://psi.hupo.org/ms/mzml http://psi.hupo.org/ms/mzml/schema/mzML1.1.0.xsd">
  <cvList count="1">
    <cv id="MS" fullName="PSI Mass Spectrometry Ontology" version="4.1.0" URI="https://raw.githubusercontent.com/HUPO-PSI/psi-ms-CV/master/psi-ms.obo"/>
  </cvList>
  <run id="run1">
    <spectrumList count="${spectra.length}" defaultDataProcessingRef="dp1">
${spectrumXml}
    </spectrumList>
  </run>
</mzML>`;

  return {
    mzml,
    spectrumCount: spectra.length,
  };
}

function waitFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

export default function MgfToMzmlConverterClient() {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [uploadedFile, setUploadedFile] = useState('');
  const [resultXml, setResultXml] = useState('');
  const [spectrumCount, setSpectrumCount] = useState(0);

  const statusMessage = useMemo(() => {
    if (status === 'parsing') return 'Parsing MGF...';
    if (status === 'encoding') return 'Encoding Base64 Arrays...';
    if (status === 'xml') return 'Generating XML...';
    if (status === 'ready') return `Conversion complete. ${spectrumCount} spectra encoded.`;
    if (status === 'error') return error;
    return 'Upload an .mgf file to begin secure local conversion.';
  }, [error, spectrumCount, status]);

  function resetOutput() {
    setResultXml('');
    setSpectrumCount(0);
  }

  async function runConversion(fileText) {
    setError('');
    setStatus('parsing');
    resetOutput();
    await waitFrame();

    // Parsing and conversion are staged so users can see progress for larger files.
    let parsed;
    try {
      const spectra = parseMgfBlocks(fileText);
      if (!spectra.length) {
        throw new Error('No valid spectra found. Ensure the MGF has spectra blocks and peak pairs.');
      }

      setStatus('encoding');
      await waitFrame();

      const spectrumXml = spectra.map((spec, idx) => buildSpectrumXml(spec, idx)).join('\n');

      setStatus('xml');
      await waitFrame();

      const mzml = `<?xml version="1.0" encoding="UTF-8"?>
<mzML xmlns="http://psi.hupo.org/ms/mzml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.1.0" xsi:schemaLocation="http://psi.hupo.org/ms/mzml http://psi.hupo.org/ms/mzml/schema/mzML1.1.0.xsd">
  <cvList count="1">
    <cv id="MS" fullName="PSI Mass Spectrometry Ontology" version="4.1.0" URI="https://raw.githubusercontent.com/HUPO-PSI/psi-ms-CV/master/psi-ms.obo"/>
  </cvList>
  <run id="run1">
    <spectrumList count="${spectra.length}" defaultDataProcessingRef="dp1">
${spectrumXml}
    </spectrumList>
  </run>
</mzML>`;

      parsed = { mzml, spectrumCount: spectra.length };
    } catch (conversionError) {
      setError(conversionError.message || 'Conversion failed.');
      setStatus('error');
      return;
    }

    setResultXml(parsed.mzml);
    setSpectrumCount(parsed.spectrumCount);
    setStatus('ready');
  }

  function handleFileSelect(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.mgf')) {
      setError('Please upload a valid .mgf file.');
      setStatus('error');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const text = String(reader.result || '');
      setUploadedFile(file.name);
      await runConversion(text);
    };
    reader.onerror = () => {
      setError('Unable to read the selected MGF file.');
      setStatus('error');
    };
    reader.readAsText(file);
  }

  function onDragOver(event) {
    event.preventDefault();
    setDragActive(true);
  }

  function onDragLeave(event) {
    event.preventDefault();
    setDragActive(false);
  }

  function onDrop(event) {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer?.files?.[0];
    if (!file) return;
    handleFileSelect({ target: { files: [file] } });
  }

  function handleDownload() {
    if (!resultXml.trim()) return;

    const outputName = uploadedFile ? uploadedFile.replace(/\.mgf$/i, '') : 'converted-spectra';
    const blob = new Blob([resultXml], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `${outputName}.mzml`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="g-px pb-12 pt-2">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-black/20 md:p-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white md:text-4xl">
          MGF to mzML File Converter
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-700 dark:text-slate-300 md:text-base">
          Clinical-grade browser conversion for mass spectrometry peak lists. Convert Mascot Generic Format files
          into HUPO-PSI mzML XML locally for strict data privacy.
        </p>

        <div className="mt-7 rounded-xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/40">
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`rounded-xl border-2 border-dashed p-6 text-center transition md:p-10 ${
              dragActive
                ? 'border-cyan-500 bg-cyan-50/50 dark:bg-cyan-500/10'
                : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950/60'
            }`}
          >
            <input ref={fileInputRef} type="file" accept=".mgf" onChange={handleFileSelect} className="hidden" />
            <p className="text-base font-semibold text-slate-900 dark:text-white">Drop your .mgf file here</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">or click to browse from your workstation</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-cyan-500 dark:text-black dark:hover:bg-cyan-400"
            >
              Upload MGF File
            </button>
            {uploadedFile && <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">Loaded: {uploadedFile}</p>}
          </div>

          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            {TRUST_TEXT}
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/50">
          <p className={`font-medium ${status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-200'}`}>
            {statusMessage}
          </p>
          {status === 'ready' && (
            <div className="mt-3">
              <button
                type="button"
                onClick={handleDownload}
                className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
              >
                Download .mzML
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
