'use client';

import { useMemo, useState } from 'react';

const foundationalMap = [
  // Longer combinations first for better shaping control.
  ['क्ष', 'If'],
  ['त्र', 'q'],
  ['ज्ञ', '1'],
  ['श्र', 'z|'],
  ['क्र', 'qm'],
  ['ग्र', 'u|'],

  // Independent vowels.
  ['अ', 'c'],
  ['आ', 'cf'],
  ['इ', 'O'],
  ['ई', 'O{'],
  ['उ', 'p'],
  ['ऊ', 'pm'],
  ['ए', 'P'],
  ['ऐ', 'P{'],
  ['ओ', 'cf]'],
  ['औ', 'cf}'],

  // Consonants.
  ['क', 's'],
  ['ख', 'v'],
  ['ग', 'u'],
  ['घ', '3'],
  ['ङ', 'ª'],
  ['च', 'r'],
  ['छ', '5'],
  ['ज', 'h'],
  ['झ', '`'],
  ['ञ', '~'],
  ['ट', '6'],
  ['ठ', '7'],
  ['ड', '8'],
  ['ढ', '9'],
  ['ण', '0f'],
  ['त', 't'],
  ['थ', 'y'],
  ['द', 'b'],
  ['ध', 'w'],
  ['न', 'g'],
  ['प', 'k'],
  ['फ', 'km'],
  ['ब', 'a'],
  ['भ', 'e'],
  ['म', 'd'],
  ['य', 'o'],
  ['र', '/'],
  ['ल', 'n'],
  ['व', 'j'],
  ['श', 'z'],
  ['ष', 'if'],
  ['स', ';'],
  ['ह', 'x'],

  // Vowel signs and modifiers.
  ['ा', 'f'],
  ['ि', 'l'],
  ['ी', 'L'],
  ['ु', '\\'],
  ['ू', '|'],
  ['े', ']'],
  ['ै', '}'],
  ['ो', 'f]'],
  ['ौ', 'f}'],
  ['ं', '+'],
  ['ँ', 'F'],
  ['ः', ':'],
  ['्', '\\'],

  // Digits and punctuation.
  ['०', '!)'],
  ['१', '!'],
  ['२', '@'],
  ['३', '#'],
  ['४', '$'],
  ['५', '%'],
  ['६', '^'],
  ['७', '&'],
  ['८', '*'],
  ['९', '('],
  ['।', '.'],
  ['॥', '..'],
];

function sortMappingByLength(mappingPairs) {
  return [...mappingPairs].sort((a, b) => b[0].length - a[0].length);
}

function applyOrderedReplacement(input, mappingPairs) {
  let output = input;

  mappingPairs.forEach(([unicodeToken, preetiToken]) => {
    output = output.split(unicodeToken).join(preetiToken);
  });

  return output;
}

function normalizeNepaliCombos(text) {
  // Placeholder normalization hooks for future full dictionary expansion.
  // Keeping this function separate makes advanced shaping rules easier to maintain.
  return text.replace(/\u200d/g, '');
}

export function convertToPreeti(unicodeText) {
  if (!unicodeText) return '';

  const normalized = normalizeNepaliCombos(unicodeText);
  const orderedMap = sortMappingByLength(foundationalMap);

  return applyOrderedReplacement(normalized, orderedMap);
}

export default function UnicodeToPreetiConverterClient() {
  const [unicodeInput, setUnicodeInput] = useState('');
  const [copied, setCopied] = useState(false);

  const preetiOutput = useMemo(() => convertToPreeti(unicodeInput), [unicodeInput]);

  function handleInput(event) {
    setUnicodeInput(event.target.value);
    setCopied(false);
  }

  async function handleCopy() {
    if (!preetiOutput.trim()) return;
    try {
      await navigator.clipboard.writeText(preetiOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // Keep UX smooth without breaking on clipboard restrictions.
    }
  }

  function handleClear() {
    setUnicodeInput('');
    setCopied(false);
  }

  function handleDownload() {
    if (!preetiOutput.trim()) return;

    const blob = new Blob([preetiOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');

    anchor.href = url;
    anchor.download = 'unicode-to-preeti-output.txt';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="g-px pb-12 pt-2">
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 md:p-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white md:text-4xl">
          Unicode to Preeti Converter
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-700 dark:text-neutral-300 md:text-base">
          Real-time Nepali Unicode to Preeti conversion for fast type-and-copy workflows. Paste text on the left
          and instantly get Preeti output on the right.
        </p>

        <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="rounded-xl border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
            <label className="mb-2 block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              Type or paste Nepali Unicode here...
            </label>
            <textarea
              value={unicodeInput}
              onInput={handleInput}
              onKeyUp={handleInput}
              className="h-80 w-full resize-y rounded-lg border border-neutral-300 bg-white p-3 text-base text-neutral-900 outline-none ring-yellow-300 placeholder:text-neutral-400 focus:ring dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
              placeholder="नेपाली यूनिकोड यहाँ टाइप गर्नुहोस्..."
            />
          </div>

          <div className="rounded-xl border border-neutral-300 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-900/50">
            <label className="mb-2 block text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              Preeti font output...
            </label>
            <textarea
              readOnly
              value={preetiOutput}
              className="h-80 w-full resize-y rounded-lg border border-neutral-300 bg-white p-3 text-base text-neutral-900 outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white"
              placeholder="Preeti font output..."
              style={{ fontFamily: "'Preeti', sans-serif" }}
            />

            <div className="mt-3 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!preetiOutput.trim()}
                className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-yellow-500 dark:text-black dark:hover:bg-yellow-400"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!preetiOutput.trim()}
                className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              >
                Download as .txt
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
