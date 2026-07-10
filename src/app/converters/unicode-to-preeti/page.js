import UnicodeToPreetiConverterClient from '@/components/converters/UnicodeToPreetiConverterClient';

// Force static generation - prebuilt at build time
export const dynamic = 'force-static';
export const revalidate = false; // Permanent static cache

const pageUrl = 'https://techolyze.com/converters/unicode-to-preeti';
const ogImageUrl = 'https://techolyze.com/og-image.png';

export const metadata = {
  title: 'Nepali Unicode to Preeti Converter Online (Typing Tool) | Free Real-Time Converter',
  description:
    'Free, instant, and real-time Nepali text conversion. Type in Unicode and instantly get Preeti font output. Copy and paste easily.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Nepali Unicode to Preeti Converter Online (Typing Tool)',
    description:
      'Convert Nepali Unicode text to Preeti instantly with a real-time browser tool. Free online typing converter with copy and download options.',
    url: pageUrl,
    siteName: 'Techolyze',
    type: 'website',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Unicode to Preeti Converter for Nepali Typing',
      },
    ],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Unicode to Preeti Converter',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  url: pageUrl,
  description:
    'Real-time Nepali Unicode to Preeti conversion tool for typing, publishing, and document preparation. Free browser-based converter.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can I convert Preeti back to Unicode?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, but you need a reverse Preeti-to-Unicode mapping tool. This page is focused on Unicode to Preeti conversion only.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does the Preeti output look like gibberish on my screen?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Preeti is a legacy font encoding. Install the Preeti font on your system so the converted characters render correctly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this converter free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The converter is free, runs in your browser, and supports instant real-time text conversion.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppSchema).replace(/</g, '\\u003c'),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c'),
        }}
      />

      <UnicodeToPreetiConverterClient />

      <section className="g-px pb-20">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 md:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How to convert Nepali Unicode to Preeti font.
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 1: Type or paste Unicode Nepali text</h3>
            <p>Enter your Unicode Nepali text into the left input panel.</p>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 2: Get live Preeti output instantly</h3>
            <p>The converter translates text in real time as you type, with no page refresh.</p>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 3: Copy or download the converted text</h3>
            <p>Use the Copy, Clear, and Download buttons for quick publishing and document use.</p>
          </div>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            What is the difference between Unicode and Preeti?
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            Unicode is the global standard for multilingual text on modern websites and apps. Preeti is a legacy
            ASCII-based Nepali font commonly used in older publishing systems, office workflows, and government
            document formats in Nepal.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How to install the Preeti font on your computer.
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <p>
              On Windows: download the Preeti .ttf file, right-click it, and select Install. Restart your browser
              or editor.
            </p>
            <p>
              On macOS: double-click the font file, click Install Font in Font Book, and reopen your application.
            </p>
            <p>
              If output still appears unreadable, confirm that your app is set to display text using the Preeti
              font family.
            </p>
          </div>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-5 space-y-6 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Can I convert Preeti back to Unicode?
              </h3>
              <p className="mt-2">
                Yes. You need a separate reverse conversion utility specifically designed for Preeti-to-Unicode
                mapping.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Does this tool work on mobile devices?
              </h3>
              <p className="mt-2">
                Yes. The interface is responsive and supports mobile and desktop. For proper visual rendering,
                install Preeti where possible.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Is my text stored on a server?
              </h3>
              <p className="mt-2">
                No. Conversion happens client-side in your browser only, so text stays local to your device.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
