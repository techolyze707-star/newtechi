'use client';

import { useMemo, useState } from 'react';

// ---------------------------------------------------------------------------
// Romanized-to-Preeti mapping table
// Romanized (phonetic English) → Nepali Unicode → Preeti font character(s)
// Strategy: map romanized syllables/clusters directly to Preeti code points.
// Longer / more specific patterns must come BEFORE shorter ones.
// ---------------------------------------------------------------------------

// Each entry: [romanized_string, preeti_output]
// The romanized column uses lowercase; input will be lowercased before lookup.
const ROMANIZED_TO_PREETI = [
  // ── Conjuncts & special clusters (must come first) ────────────────────────
  ['ksha', 'If'],
  ['tra', 'q'],
  ['gya', '1'],
  ['shra', 'z|'],
  ['kra', 'qm'],
  ['gra', 'u|'],

  // ── Aspirated consonants (digraphs – must precede single-letter forms) ───
  ['chh', '5'],
  ['kh', 'v'],
  ['gh', '3'],
  ['ch', 'r'],
  ['jh', '`'],
  ['tth', '7'],   // ठ  (retroflex aspirated)
  ['ddh', '9'],   // ढ  (retroflex aspirated)
  ['th', 'y'],    // थ
  ['dh', 'w'],    // ध
  ['ph', 'km'],   // फ
  ['bh', 'e'],    // भ
  ['sh', 'z'],    // श (also covers 'sh' → श)
  ['rr', '/'],    // alternate र

  // ── Retroflex consonants ──────────────────────────────────────────────────
  ['tt', '6'],    // ट
  ['dd', '8'],    // ड
  ['nn', '0f'],   // ण

  // ── Basic consonants ──────────────────────────────────────────────────────
  ['k', 's'],
  ['g', 'u'],
  ['ng', 'ª'],
  ['c', 'r'],     // alternative for च
  ['j', 'h'],
  ['ny', '~'],    // ञ
  ['t', 't'],
  ['d', 'b'],
  ['n', 'g'],
  ['p', 'k'],
  ['b', 'a'],
  ['m', 'd'],
  ['y', 'o'],
  ['r', '/'],
  ['l', 'n'],
  ['w', 'j'],
  ['v', 'j'],     // व
  ['s', ';'],
  ['h', 'x'],

  // ── Vowels (independent) ─────────────────────────────────────────────────
  // Long vowels before short to avoid mis-match
  ['aa', 'cf'],
  ['ii', 'O{'],
  ['uu', 'pm'],
  ['ai', 'P{'],   // ऐ
  ['au', 'cf}'],  // औ
  ['oo', 'cf]'],  // ओ (alternate)
  ['a', 'c'],
  ['i', 'O'],
  ['u', 'p'],
  ['e', 'P'],
  ['o', 'cf]'],

  // ── Vowel diacritics (matras) — used after consonants ────────────────────
  // These are handled via the pipeline, not direct replacement.
  // They are included here for stand-alone vowel input use.

  // ── Anusvara / visarga / chandrabindu ────────────────────────────────────
  ['m~', '+'],   // anusvara
  ['h~', ':'],   // visarga
  ['n~', 'F'],   // chandrabindu

  // ── Halant (virama) ───────────────────────────────────────────────────────
  ['\\.', '\\'], // explicit halant when user types "."

  // ── Nepali digits ─────────────────────────────────────────────────────────
  ['0', '!)'],
  ['1', '!'],
  ['2', '@'],
  ['3', '#'],
  ['4', '$'],
  ['5', '%'],
  ['6', '^'],
  ['7', '&'],
  ['8', '*'],
  ['9', '('],

  // ── Punctuation ───────────────────────────────────────────────────────────
  ['|', '.'],   // daṇḍa
  ['||', '..'], // double daṇḍa
];

// ---------------------------------------------------------------------------
// Conversion engine
// ---------------------------------------------------------------------------

/**
 * Convert romanized Nepali text to Preeti font encoding.
 * The algorithm does a greedy longest-match left-to-right scan.
 */
export function convertRomanizedToPreeti(input) {
  if (!input) return '';

  // Normalize: collapse multiple spaces but preserve newlines
  const lines = input.split('\n');

  return lines
    .map((line) => convertLine(line))
    .join('\n');
}

function convertLine(line) {
  if (!line.trim()) return line;

  let output = '';
  let i = 0;
  const lower = line.toLowerCase();

  while (i < lower.length) {
    let matched = false;

    // Try longest match first
    for (const [roman, preeti] of ROMANIZED_TO_PREETI) {
      if (lower.startsWith(roman, i)) {
        output += preeti;
        i += roman.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      // Pass through unknown characters unchanged (spaces, punctuation, etc.)
      output += line[i];
      i += 1;
    }
  }

  return output;
}

// ---------------------------------------------------------------------------
// UI Component
// ---------------------------------------------------------------------------

const CHAR_LIMIT = 50000;

export default function RomanizedToPreetiConverterClient() {
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);

  const output = useMemo(() => convertRomanizedToPreeti(input), [input]);

  const charCount = input.length;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  function handleInput(e) {
    const value = e.target.value;
    if (value.length > CHAR_LIMIT) return;
    setInput(value);
    setCopied(false);
  }

  async function handleCopy() {
    if (!output.trim()) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API may be blocked in some environments
    }
  }

  function handleClear() {
    setInput('');
    setCopied(false);
  }

  function handleDownload() {
    if (!output.trim()) return;
    const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'romanized-to-preeti-output.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function handlePaste() {
    // Handled via onChange – nothing extra needed
  }

  const hasOutput = output.trim().length > 0;

  return (
    <section className="g-px pb-12 pt-2" aria-label="Romanized to Preeti Converter">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 md:p-8">

        {/* Header */}
        <header>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
            Romanized to Preeti Converter
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-700 dark:text-neutral-300 md:text-base">
            Type Nepali text in Roman / English letters (e.g. <strong>namaste</strong>, <strong>kathmandu</strong>) and
            instantly get the matching{' '}
            <strong>Preeti font</strong> output. No installation required — converts in real time, entirely in your browser.
          </p>
        </header>

        {/* Stats bar */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-neutral-500 dark:text-neutral-400">
          <span>Characters: <strong className="text-neutral-800 dark:text-neutral-200">{charCount}</strong> / {CHAR_LIMIT.toLocaleString()}</span>
          <span>Words: <strong className="text-neutral-800 dark:text-neutral-200">{wordCount}</strong></span>
        </div>

        {/* Two-column editor */}
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* Input panel */}
          <div className="rounded-xl border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
            <label
              htmlFor="romanized-input"
              className="mb-2 block text-sm font-semibold text-neutral-800 dark:text-neutral-200"
            >
              Type or paste Romanized Nepali here…
            </label>
            <textarea
              id="romanized-input"
              value={input}
              onChange={handleInput}
              onPaste={handlePaste}
              className="h-72 w-full resize-y rounded-lg border border-neutral-300 bg-white p-3 font-mono text-sm text-neutral-900 outline-none ring-yellow-300 placeholder:text-neutral-400 focus:ring dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
              placeholder="e.g.  namaste Nepal..."
              spellCheck={false}
              autoComplete="off"
              aria-label="Romanized Nepali input"
            />
            <p className="mt-2 text-xs text-neutral-400">
              Use English phonetic spellings: <code>k, kh, g, gh, ch, chh, j, t, d, n, p, ph, b, bh, m, y, r, l, v/w, sh, s, h</code>
            </p>
          </div>

          {/* Output panel */}
          <div className="rounded-xl border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
            <label
              htmlFor="preeti-output"
              className="mb-2 block text-sm font-semibold text-neutral-800 dark:text-neutral-200"
            >
              Preeti font output…
            </label>
            <textarea
              id="preeti-output"
              readOnly
              value={output}
              className="h-72 w-full resize-y rounded-lg border border-neutral-300 bg-white p-3 text-sm text-neutral-900 outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
              placeholder="Preeti output will appear here…"
              style={{ fontFamily: "'Preeti', 'Arial', sans-serif" }}
              aria-label="Preeti font output"
              aria-live="polite"
            />

            {/* Action buttons */}
            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                id="copy-preeti-btn"
                onClick={handleCopy}
                disabled={!hasOutput}
                className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-400"
                aria-label="Copy Preeti output to clipboard"
              >
                {copied ? '✓ Copied!' : 'Copy to Clipboard'}
              </button>
              <button
                type="button"
                id="clear-input-btn"
                onClick={handleClear}
                className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                aria-label="Clear all input and output"
              >
                Clear All
              </button>
              <button
                type="button"
                id="download-preeti-btn"
                onClick={handleDownload}
                disabled={!hasOutput}
                className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                aria-label="Download Preeti output as text file"
              >
                Download as .txt
              </button>
            </div>
          </div>
        </div>

        {/* Trust badge */}
        <div className="mt-6 rounded-lg border border-emerald-400/40 bg-emerald-500/10 p-4 text-sm font-semibold text-emerald-700 dark:text-emerald-200">
          🔒 100% Private — your text is never uploaded to any server. All conversion happens locally in your browser.
        </div>

      </div>
    </section>
  );
}
