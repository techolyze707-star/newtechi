'use client';

import { useMemo, useRef, useState } from 'react';

const TRUST_TEXT = '100% Secure: Your calendar data never leaves your browser.';

const FIELD_LABELS = {
  title: 'Event Title',
  start: 'Start Date/Time',
  end: 'End Date/Time',
  description: 'Description',
  location: 'Location',
};

function escapeICSText(value = '') {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

function formatDateToICS(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date value: ${value}`);
  }

  const pad = (n) => String(n).padStart(2, '0');
  const year = date.getUTCFullYear();
  const month = pad(date.getUTCMonth() + 1);
  const day = pad(date.getUTCDate());
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
}

function buildIcsContent(rows, mapping) {
  const nowStamp = formatDateToICS(new Date().toISOString());
  const eventBlocks = [];

  rows.forEach((row, rowIndex) => {
    const rawTitle = row[mapping.title] ?? '';
    const rawStart = row[mapping.start] ?? '';
    const rawEnd = row[mapping.end] ?? '';

    if (!String(rawStart).trim()) {
      return;
    }

    const dtStart = formatDateToICS(rawStart);
    const dtEnd = String(rawEnd).trim() ? formatDateToICS(rawEnd) : dtStart;
    const summary = escapeICSText(String(rawTitle).trim() || `Event ${rowIndex + 1}`);
    const description = mapping.description
      ? escapeICSText(String(row[mapping.description] ?? '').trim())
      : '';
    const location = mapping.location
      ? escapeICSText(String(row[mapping.location] ?? '').trim())
      : '';

    const uid = `csv2ics-${Date.now()}-${rowIndex}@techolyze.com`;

    const lines = [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${nowStamp}`,
      `SUMMARY:${summary}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
    ];

    if (description) {
      lines.push(`DESCRIPTION:${description}`);
    }
    if (location) {
      lines.push(`LOCATION:${location}`);
    }

    lines.push('END:VEVENT');
    eventBlocks.push(lines.join('\r\n'));
  });

  if (!eventBlocks.length) {
    throw new Error('No valid events found after mapping. Check date values and selected columns.');
  }

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Techolyze//CSV to ICS Converter//EN',
    'CALSCALE:GREGORIAN',
    ...eventBlocks,
    'END:VCALENDAR',
  ].join('\r\n');
}

export default function CsvToIcsConverterClient() {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [mapping, setMapping] = useState({
    title: '',
    start: '',
    end: '',
    description: '',
    location: '',
  });
  const [icsContent, setIcsContent] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  const step2Visible = headers.length > 0;
  const step3Ready = step2Visible && rows.length > 0;

  const statusMessage = useMemo(() => {
    if (status === 'parsed') {
      return `CSV parsed successfully. ${rows.length} rows detected.`;
    }
    if (status === 'generated') {
      return 'ICS file generated successfully. Download your .ics file below.';
    }
    if (status === 'error') {
      return error;
    }
    return 'Upload a CSV file to begin mapping columns.';
  }, [error, rows.length, status]);

  function populateMapping(nextHeaders) {
    const findMatch = (keywords) => {
      const lowerHeaders = nextHeaders.map((h) => String(h).toLowerCase().trim());
      const idx = lowerHeaders.findIndex((name) => keywords.some((keyword) => name.includes(keyword)));
      return idx >= 0 ? nextHeaders[idx] : '';
    };

    setMapping({
      title: findMatch(['title', 'event', 'summary', 'name']),
      start: findMatch(['start', 'start date', 'start time', 'begin']),
      end: findMatch(['end', 'end date', 'end time', 'finish']),
      description: findMatch(['description', 'details', 'notes']),
      location: findMatch(['location', 'venue', 'place']),
    });
  }

  function parseCsvText(csvText, fileName = 'calendar.csv') {
    const parser = typeof window !== 'undefined' ? window.Papa : null;
    if (!parser || typeof parser.parse !== 'function') {
      throw new Error('CSV parser is still loading. Please wait and try again.');
    }

    const result = parser.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    if (result.errors?.length) {
      const first = result.errors[0];
      throw new Error(first.message || 'Failed to parse CSV file.');
    }

    const parsedHeaders = result.meta?.fields || [];
    if (!parsedHeaders.length) {
      throw new Error('No CSV headers found. Ensure first row contains column names.');
    }

    if (!result.data?.length) {
      throw new Error('CSV contains headers but no event rows.');
    }

    setHeaders(parsedHeaders);
    setRows(result.data);
    setUploadedFileName(fileName);
    setIcsContent('');
    setError('');
    setStatus('parsed');
    populateMapping(parsedHeaders);
  }

  function handleFileUpload(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please upload a valid .csv file.');
      setStatus('error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        parseCsvText(String(reader.result || ''), file.name);
      } catch (parseError) {
        setError(parseError.message || 'Unable to parse CSV.');
        setStatus('error');
      }
    };
    reader.onerror = () => {
      setError('Unable to read the uploaded CSV file.');
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
    handleFileUpload({ target: { files: [file] } });
  }

  function updateMapping(field, value) {
    setMapping((prev) => ({ ...prev, [field]: value }));
  }

  function generateICS() {
    if (!mapping.start) {
      setError('Please map the Start Date/Time column before generating ICS.');
      setStatus('error');
      return;
    }

    if (!mapping.title || !mapping.end || !mapping.description || !mapping.location) {
      setError('Please map all required fields before generating ICS.');
      setStatus('error');
      return;
    }

    try {
      const content = buildIcsContent(rows, mapping);
      setIcsContent(content);
      setError('');
      setStatus('generated');
    } catch (generateError) {
      setError(generateError.message || 'Failed to generate ICS file.');
      setStatus('error');
    }
  }

  function downloadIcs() {
    if (!icsContent) return;

    const outputName = uploadedFileName ? uploadedFileName.replace(/\.csv$/i, '') : 'calendar-events';
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = `${outputName}.ics`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="g-px pb-12 pt-2">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 md:p-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
          CSV to ICS File Converter
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-700 dark:text-neutral-300 md:text-base">
          Convert bulk event spreadsheets into iCalendar (.ics) format for Google Calendar, Outlook, and Apple
          Calendar without uploading your data.
        </p>

        <div className="mt-7 rounded-xl border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/40">
          <p className="mb-3 text-sm font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
            Step 1: Upload CSV File
          </p>
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`rounded-xl border-2 border-dashed p-6 text-center transition md:p-10 ${
              dragActive
                ? 'border-yellow-500 bg-yellow-50/40 dark:bg-yellow-500/10'
                : 'border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-950/60'
            }`}
          >
            <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
            <p className="text-base font-semibold text-neutral-900 dark:text-white">Drop your .csv file here</p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">or browse from your device</p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 rounded-lg bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700 dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-400"
            >
              Upload CSV
            </button>
            {uploadedFileName && (
              <p className="mt-3 text-xs font-medium text-neutral-600 dark:text-neutral-300">Uploaded: {uploadedFileName}</p>
            )}
          </div>
          <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300">
            {TRUST_TEXT}
          </div>
        </div>

        {step2Visible && (
          <div className="mt-7 rounded-xl border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/40">
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
              Step 2: Map Your Columns
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {Object.entries(FIELD_LABELS).map(([fieldKey, label]) => (
                <label key={fieldKey} className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  {label}
                  <select
                    value={mapping[fieldKey]}
                    onChange={(event) => updateMapping(fieldKey, event.target.value)}
                    className="mt-2 w-full rounded-lg border border-neutral-300 bg-white p-2 text-sm text-neutral-900 outline-none ring-yellow-300 focus:ring dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
                  >
                    <option value="">Select column...</option>
                    {headers.map((header) => (
                      <option key={`${fieldKey}-${header}`} value={header}>
                        {header}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </div>
        )}

        {step3Ready && (
          <div className="mt-7 rounded-xl border border-neutral-300 bg-neutral-50 p-5 dark:border-neutral-700 dark:bg-neutral-900/40">
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
              Step 3: Generate and Download
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={generateICS}
                className="rounded-lg bg-yellow-500 px-6 py-2 text-sm font-bold text-black transition hover:bg-yellow-400"
              >
                Generate ICS File
              </button>
              {icsContent && (
                <button
                  type="button"
                  onClick={downloadIcs}
                  className="rounded-lg border border-neutral-300 px-6 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                >
                  Download .ics
                </button>
              )}
            </div>
          </div>
        )}

        <div className="mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm dark:border-neutral-800 dark:bg-neutral-900/50">
          <p className={`font-medium ${status === 'error' ? 'text-red-600 dark:text-red-400' : 'text-neutral-700 dark:text-neutral-200'}`}>
            {statusMessage}
          </p>
        </div>
      </div>
    </section>
  );
}
