import QboToIifConverterClient from '@/components/converters/QboToIifConverterClient';

// Force static generation - prebuilt at build time
export const dynamic = 'force-static';
export const revalidate = false; // Permanent static cache

const pageUrl = 'https://techolyze.com/converters/qbo-to-iif';
const ogImageUrl = 'https://techolyze.com/og-image.png';

export const metadata = {
  title: 'Convert QBO to IIF Online Free | Secure & Instant QBO to IIF Converter',
  description:
    'Convert QBO to IIF online for free with instant processing in your browser. Secure and private conversion with no server upload required.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Convert QBO to IIF Online Free | Secure & Instant Converter',
    description:
      'Free, secure, and instant QBO to IIF conversion. Your financial data is processed locally in the browser with no server upload required.',
    url: pageUrl,
    siteName: 'Techolyze',
    type: 'website',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'Convert QBO to IIF Online',
      },
    ],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'QBO to IIF File Converter',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  url: pageUrl,
  description:
    'Free QBO to IIF converter that runs entirely in your browser. Convert QuickBooks Web Connect files instantly with local processing for privacy and security.',
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
      name: 'Can I convert QBO to IIF without uploading files?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. This converter processes your QBO file directly in your browser. No file is uploaded to a remote server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this QBO to IIF converter free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. You can convert QBO files to IIF for free with no signup and no hidden processing fees.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will converted IIF files work with QuickBooks?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tool creates standard tab-delimited IIF transaction rows for import workflows. Review mappings like account names before final import in QuickBooks.',
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

      <QboToIifConverterClient />

      <section className="g-px pb-20">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 md:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How to Convert QuickBooks QBO to IIF Free
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 1: Upload your QBO file</h3>
            <p>
              Drag and drop your QuickBooks QBO file into the upload box, or select it manually from your
              device.
            </p>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 2: Convert instantly</h3>
            <p>
              Click the Convert to IIF button. The file is parsed in your browser and transformed into an IIF
              transaction format in seconds.
            </p>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 3: Download your IIF file</h3>
            <p>
              Once conversion is complete, download the generated .iif file and import it into your accounting
              workflow.
            </p>
          </div>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Is it safe to convert financial files online?
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            Yes. This converter is designed for privacy-first financial workflows. Your QBO data is processed
            locally in your browser using client-side JavaScript, so your financial records never leave your
            device and are never uploaded to our server.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            What is a QBO file?
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            A QBO file is a QuickBooks Web Connect file format based on OFX (Open Financial Exchange). Banks
            and financial institutions use QBO exports to share account transaction data with QuickBooks. These
            files typically include transaction dates, amounts, payees, and memo fields.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            What is an IIF file?
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            IIF stands for Intuit Interchange Format. It is a tab-delimited text format used to import
            transactions and lists into QuickBooks desktop workflows. Converting QBO to IIF can help when your
            bookkeeping process expects IIF imports.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-5 space-y-6 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Can I use this converter on mobile devices?
              </h3>
              <p className="mt-2">
                Yes. The page is responsive and works on modern mobile browsers, tablets, and desktop devices.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Does this tool store my banking data?
              </h3>
              <p className="mt-2">
                No. The conversion logic runs entirely in-browser and does not send your QBO content to a
                backend.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Should I review the IIF output before importing?
              </h3>
              <p className="mt-2">
                Yes. Always review converted data, especially account labels and transaction types, before final
                import into production accounting files.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
