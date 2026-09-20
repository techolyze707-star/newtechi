import RomanizedToPreetiConverterClient from '@/components/converters/RomanizedToPreetiConverterClient';

// Force static generation – prebuilt at build time, never re-rendered on server
export const dynamic = 'force-static';
export const revalidate = false;

const pageUrl = 'https://techolyze.com/converters/romanized-to-preeti';
const ogImageUrl = 'https://techolyze.com/og-image.png';

// ─── Next.js Metadata ────────────────────────────────────────────────────────

export const metadata = {
  title: 'Romanized to Preeti Converter — Type English, Get Preeti Font Instantly | Free Online Tool',
  description:
    'Free real-time Romanized Nepali to Preeti font converter. Type in English phonetics (namaste, kathmandu) and instantly get Preeti-encoded output. Copy, download, and use in MS Word, Publisher, or any legacy Nepali publishing software.',
  keywords: [
    'romanized to preeti',
    'roman to preeti converter',
    'english to preeti converter',
    'nepali romanized to preeti',
    'preeti font converter',
    'romanized nepali font converter',
    'type nepali in english get preeti',
    'preeti typing tool',
    'nepali preeti keyboard',
    'roman nepali to preeti online',
    'preeti font typing online',
    'convert roman nepali to preeti',
    'preeti font encoding converter',
    'nepali font converter online free',
    'preeti font typing english keyboard',
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Romanized to Preeti Converter — Free Online Nepali Typing Tool',
    description:
      'Type Nepali in Roman script and get instant Preeti font output. Free, private, and browser-based — no server uploads, no install required.',
    url: pageUrl,
    siteName: 'Techolyze',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Romanized to Preeti Converter – Free Online Tool by Techolyze',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Romanized to Preeti Converter | Free Online Nepali Typing Tool',
    description:
      'Type Nepali phonetically in English and get Preeti font output instantly. 100% free and browser-based.',
    images: [ogImageUrl],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// ─── Schema.org Structured Data ──────────────────────────────────────────────

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Romanized to Preeti Converter',
  url: pageUrl,
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  browserRequirements: 'Requires JavaScript',
  description:
    'A free, real-time browser tool that converts Romanized (phonetic English) Nepali text into Preeti legacy font encoding. Supports copy to clipboard, download as .txt, and processes all text client-side for complete privacy.',
  featureList: [
    'Real-time conversion as you type',
    'Copy output to clipboard',
    'Download output as .txt file',
    'No server upload – 100% private',
    'Works on mobile and desktop',
    'Free with no daily limits',
  ],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  creator: {
    '@type': 'Organization',
    name: 'Techolyze',
    url: 'https://techolyze.com',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://techolyze.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Converters',
      item: 'https://techolyze.com/converters',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Romanized to Preeti Converter',
      item: pageUrl,
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to convert Romanized Nepali text to Preeti font',
  description:
    'Step-by-step guide to using the free Romanized to Preeti converter on Techolyze.',
  totalTime: 'PT1M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Type or paste Romanized Nepali text',
      text: 'Enter your Nepali text written in English phonetics (e.g. namaste, kathmandu) into the left input box.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'View the real-time Preeti output',
      text: 'The converter instantly translates each phonetic syllable into the corresponding Preeti font character as you type.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Copy or download the result',
      text: 'Click "Copy to Clipboard" to paste into Word, Publisher, or any Preeti-compatible app. Use "Download as .txt" to save the file.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Romanized Nepali?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Romanized Nepali (also called Roman Nepali or phonetic Nepali) is a method of writing Nepali language using standard English (Latin) keyboard characters. For example, "namaste" represents नमस्ते. It is widely used by Nepali diaspora and learners who do not have a Devanagari keyboard layout.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the Preeti font?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Preeti is a legacy ASCII-based Nepali font designed for older publishing workflows. It maps standard ASCII characters to Nepali glyphs. Because it predates Unicode, Preeti text appears as readable Nepali only when rendered with the Preeti font installed on the system.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Romanized to Preeti converter work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The converter uses a greedy longest-match algorithm to scan your romanized input from left to right and replace phonetic syllables with their Preeti font equivalents. For example, "kh" is matched as the aspirated consonant (ख) before the single letter "k" (क), ensuring accurate output.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the converter free and private?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The converter is completely free with no account required and no daily limits. All processing happens in your browser using JavaScript — your text is never uploaded to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to install the Preeti font to use this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You do not need Preeti to use the converter. However, to correctly view the output as Nepali script you must have the Preeti font installed on your system. On Windows, download the Preeti.ttf file, right-click it, and select Install.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert the output back to Unicode?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This tool converts in one direction — Romanized → Preeti. To convert Preeti back to Unicode (or vice versa) you need a separate Preeti-to-Unicode tool.',
      },
    },
    {
      '@type': 'Question',
      name: 'What phonetic rules should I follow for input?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use standard English phonetics: k, kh, g, gh, ng for क ख ग घ ङ; ch, chh, j, jh for च छ ज झ; t/tt/tth, d/dd/ddh for dentals and retroflexes; n, p, ph, b, bh, m, y, r, l, v/w, sh, s, h for the remaining consonants. Vowels: a, aa, i, ii, u, uu, e, ai, o, au.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this tool work on mobile phones?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The converter is fully responsive and works on all modern mobile browsers. You can type using your phone keyboard and immediately see the Preeti output.',
      },
    },
  ],
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function RomanizedToPreetiPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />

      {/* Main Converter Tool */}
      <RomanizedToPreetiConverterClient />

      {/* ── Editorial / SEO Content ── */}
      <section className="g-px pb-20" aria-label="About this converter">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 md:p-8 space-y-10">

          {/* How to use */}
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              How to use the Romanized to Preeti Converter
            </h2>
            <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 1 — Type Romanized Nepali text</h3>
                <p>
                  Enter your Nepali text using English phonetic letters in the left input box. For example, type{' '}
                  <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">namaste</code> or{' '}
                  <code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">kathmandu</code>. You can also paste
                  text directly.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 2 — See live Preeti output</h3>
                <p>
                  The converter translates your input in real time. The right panel shows the Preeti-encoded characters as
                  you type — no button click needed.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 3 — Copy or download the result</h3>
                <p>
                  Use <strong>Copy to Clipboard</strong> to paste directly into Microsoft Word, Publisher, InDesign, or any
                  Preeti-compatible legacy publishing application. Or use <strong>Download as .txt</strong> to save the
                  output file.
                </p>
              </div>
            </div>
          </div>

          {/* What is Romanized Nepali */}
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              What is Romanized Nepali?
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
              Romanized Nepali — also called <strong>Roman Nepali</strong> or <strong>phonetic Nepali</strong> — is a
              system of writing Nepali using the standard English (Latin) alphabet on a QWERTY keyboard. Rather than
              learning a special Devanagari keyboard layout, users type English sounds that correspond to Nepali syllables.
              For example:
            </p>
            <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-neutral-700 dark:text-neutral-300 md:text-base">
              <li><code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">namaste</code> → नमस्ते</li>
              <li><code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">nepal</code> → नेपाल</li>
              <li><code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">kathmandu</code> → काठमाण्डौ</li>
              <li><code className="rounded bg-neutral-100 px-1 dark:bg-neutral-800">dhanyabad</code> → धन्यबाद</li>
            </ul>
            <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
              Romanized Nepali is especially popular among the Nepali diaspora, students, and anyone who types Nepali
              frequently without a dedicated Devanagari keyboard.
            </p>
          </div>

          {/* What is Preeti font */}
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              What is the Preeti font and why is it still used?
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
              <strong>Preeti</strong> is a legacy ASCII-based Nepali font that was created before Unicode became the
              standard for multilingual text. Instead of encoding actual Nepali Unicode characters, Preeti maps standard
              ASCII characters to Nepali-looking glyphs inside the font file itself.
            </p>
            <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
              Despite being a legacy format, Preeti is still widely used in Nepal because:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-neutral-700 dark:text-neutral-300 md:text-base">
              <li>Many government offices and publishing houses have archival documents in Preeti format.</li>
              <li>Older Nepali newspaper workflows are built around Preeti.</li>
              <li>Some Nepali typesetters are more comfortable with Preeti than with Unicode Devanagari.</li>
              <li>Legacy software (e.g. older versions of InDesign, PageMaker) works better with Preeti.</li>
            </ul>
          </div>

          {/* Phonetic reference table */}
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Romanized Nepali phonetic chart
            </h2>
            <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
              Use the following phonetic rules when typing in the converter:
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full text-sm border-collapse border border-neutral-200 dark:border-neutral-700">
                <thead>
                  <tr className="bg-neutral-100 dark:bg-neutral-800">
                    <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-left font-bold text-neutral-900 dark:text-white">Roman Input</th>
                    <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-left font-bold text-neutral-900 dark:text-white">Nepali Character</th>
                    <th className="border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-left font-bold text-neutral-900 dark:text-white">Example</th>
                  </tr>
                </thead>
                <tbody className="text-neutral-700 dark:text-neutral-300">
                  {[
                    ['k', 'क (ka)', 'kal → कल'],
                    ['kh', 'ख (kha)', 'khana → खाना'],
                    ['g', 'ग (ga)', 'ghar → घर (use gh)'],
                    ['gh', 'घ (gha)', 'ghar → घर'],
                    ['ch', 'च (cha)', 'chiya → चिया'],
                    ['chh', 'छ (chha)', 'chhori → छोरी'],
                    ['j', 'ज (ja)', 'jan → जन'],
                    ['t / tt', 'त / ट', 'tin → तिन'],
                    ['th / tth', 'थ / ठ', 'thulo → ठुलो (use tth)'],
                    ['d / dd', 'द / ड', 'din → दिन'],
                    ['dh / ddh', 'ध / ढ', 'dhoka → ढोका (use ddh)'],
                    ['n', 'न (na)', 'nepali → नेपाली'],
                    ['p', 'प (pa)', 'paani → पानी'],
                    ['ph', 'फ (pha)', 'phool → फूल'],
                    ['b', 'ब (ba)', 'bal → बल'],
                    ['bh', 'भ (bha)', 'bhaat → भात'],
                    ['m', 'म (ma)', 'maan → मान'],
                    ['y', 'य (ya)', 'yaar → यार'],
                    ['r', 'र (ra)', 'raat → रात'],
                    ['l', 'ल (la)', 'laal → लाल'],
                    ['v / w', 'व (wa)', 'wada → वडा'],
                    ['sh', 'श (sha)', 'shanti → शान्ति'],
                    ['s', 'स (sa)', 'saathi → साथी'],
                    ['h', 'ह (ha)', 'haat → हात'],
                    ['a / aa', 'अ / आ vowel', 'aama → आमा'],
                    ['i / ii', 'इ / ई vowel', 'indra → इन्द्र'],
                    ['u / uu', 'उ / ऊ vowel', 'usha → उषा'],
                    ['e / ai', 'ए / ऐ vowel', 'ek → एक'],
                    ['o / au', 'ओ / औ vowel', 'om → ओम'],
                  ].map(([roman, nepali, example]) => (
                    <tr key={roman} className="border-b border-neutral-100 dark:border-neutral-800 even:bg-neutral-50 dark:even:bg-neutral-900/30">
                      <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-2 font-mono font-semibold">{roman}</td>
                      <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-2">{nepali}</td>
                      <td className="border border-neutral-200 dark:border-neutral-700 px-4 py-2 font-mono text-xs">{example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Install Preeti font */}
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              How to install the Preeti font
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white">Windows</h3>
                <p>
                  Download the <strong>Preeti.ttf</strong> file from a trusted source. Right-click the file and select
                  <strong> Install</strong> or <strong>Install for all users</strong>. Restart your browser or application
                  (e.g., Microsoft Word) to activate the font.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white">macOS</h3>
                <p>
                  Double-click the <strong>Preeti.ttf</strong> file. In the Font Book preview window that opens, click
                  <strong> Install Font</strong>. The font will be available system-wide immediately.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 dark:text-white">Microsoft Word / Publisher</h3>
                <p>
                  After installing, paste the copied Preeti output into your document and change the font to
                  <strong> Preeti</strong> from the font selector. The text will render as proper Nepali Devanagari.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="mt-5 space-y-6 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
              {[
                {
                  q: 'Is the Romanized to Preeti converter free?',
                  a: 'Yes, completely free. There are no account requirements, no daily limits, and no paywalls.',
                },
                {
                  q: 'Does my text get saved on any server?',
                  a: 'No. All conversion is done locally in your browser using JavaScript. Your text never leaves your device.',
                },
                {
                  q: 'Can I convert large amounts of text?',
                  a: 'Yes. The converter handles up to 50,000 characters per session. For very large documents, use the Download as .txt feature.',
                },
                {
                  q: 'Why does the output look like random characters?',
                  a: 'Preeti is a legacy font. The output characters only display as Nepali when you view them with the Preeti font installed. Install Preeti on your system and set your document font to Preeti.',
                },
                {
                  q: 'What is the difference between Romanized to Preeti and Unicode to Preeti?',
                  a: 'The Unicode to Preeti converter takes Nepali Unicode text (Devanagari characters like नमस्ते) and converts to Preeti. This Romanized to Preeti tool starts from English phonetic input (namaste) and directly converts to Preeti — skipping the Unicode step entirely.',
                },
                {
                  q: 'Does this tool work on mobile and tablet?',
                  a: 'Yes. The interface is fully responsive and works on all modern mobile browsers. You can type on your phone keyboard and copy/download the Preeti output.',
                },
              ].map(({ q, a }) => (
                <div key={q}>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">{q}</h3>
                  <p className="mt-2">{a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related tools */}
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Related Nepali font tools
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700 dark:text-neutral-300 md:text-base">
              <li>
                <a
                  href="/converters/unicode-to-preeti"
                  className="font-semibold text-yellow-600 underline underline-offset-2 hover:text-yellow-500 dark:text-yellow-400"
                >
                  Unicode to Preeti Converter
                </a>{' '}
                — Convert Devanagari Unicode Nepali (नेपाली) to Preeti font encoding.
              </li>
              <li>
                <a
                  href="/converters"
                  className="font-semibold text-yellow-600 underline underline-offset-2 hover:text-yellow-500 dark:text-yellow-400"
                >
                  All Free Converters
                </a>{' '}
                — Browse our full suite of free online conversion tools.
              </li>
            </ul>
          </div>

        </div>
      </section>
    </>
  );
}
