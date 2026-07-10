import Link from 'next/link';

// Force static generation - prebuilt at build time
export const dynamic = 'force-static';
export const revalidate = false; // Permanent static cache

const pageUrl = 'https://techolyze.com/converters';

// Grouped for better UI/UX and scannability
const converterCategories = [
  {
    category: 'Finance & Accounting',
    items: [
      {
        title: 'QBO to IIF Converter',
        href: '/converters/qbo-to-iif',
        description: 'Convert QuickBooks Web Connect QBO files into IIF format safely.',
        icon: (
          <svg className="w-6 h-6 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
    ],
  },
  {
    category: 'Developer & IT Tools',
    items: [
      {
        title: 'YML to INI Converter',
        href: '/converters/yml-to-ini',
        description: 'Translate YAML configuration into INI format quickly and safely.',
        icon: (
          <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        ),
      },
      {
        title: 'XCAL to BIN Converter',
        href: '/converters/xcal-to-bin',
        description: 'Convert XCAL calibration files to BIN format for tuning workflows.',
        icon: (
          <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
          </svg>
        ),
      },
      {
        title: 'BIN to XCAL Converter',
        href: '/converters/bin-to-xcal',
        description: 'Reverse convert binary files to XCAL format (Intel HEX or XML).',
        icon: (
          <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
        ),
      },
    ],
  },
  {
    category: 'Data & Utilities',
    items: [
      {
        title: 'CSV to ICS Converter',
        href: '/converters/csv-to-ics',
        description: 'Convert CSV events into ICS calendar files directly in your browser.',
        icon: (
          <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        title: 'MGF to mzML Converter',
        href: '/converters/mgf-to-mzml',
        description: 'Transform mass spectrometry MGF files to mzML format locally.',
        icon: (
          <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        ),
      },
      {
        title: 'Unicode to Preeti Converter',
        href: '/converters/unicode-to-preeti',
        description: 'Convert Nepali Unicode text to Preeti instantly with real-time output.',
        icon: (
          <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
          </svg>
        ),
      },
    ],
  },
];

const faqs = [
  {
    question: "Are these file converters free to use?",
    answer: "Yes, all converters on Techolyze are 100% free to use with no hidden fees, subscriptions, or daily limits."
  },
  {
    question: "Is my data secure when converting files?",
    answer: "Absolutely. We prioritize your privacy by utilizing client-side processing. This means your files are converted locally within your web browser's memory and are never uploaded to our servers."
  },
  {
    question: "Do I need to install any software?",
    answer: "No installation is required. Our converters are entirely browser-based, meaning they work instantly on Windows, macOS, Linux, and mobile devices."
  }
];

// Extract flat list for Schema
const allConverters = converterCategories.flatMap(cat => cat.items);
const converterLinks = allConverters.map((converter, index) => ({
  '@type': 'ListItem',
  position: index + 1,
  name: converter.title,
  url: `https://techolyze.com${converter.href}`,
  description: converter.description,
}));

export const metadata = {
  title: 'Free Online File Converters & Developer Tools | Techolyze',
  description:
    'Discover our suite of free, secure, browser-based file converters. Convert CSV to ICS, QBO to IIF, YAML to INI, and more instantly with no data uploads.',
  keywords: [
    'file converters',
    'online converters',
    'browser based conversion tools',
    'CSV to ICS',
    'QBO to IIF',
    'YAML to INI',
    'secure local file conversion'
  ],
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Free Online File Converters | Techolyze',
    description:
      'Fast, secure, and free browser-based conversion tools. Your data never leaves your device.',
    url: pageUrl,
    siteName: 'Techolyze',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online File Converters | Techolyze',
    description:
      'Fast, secure, and free browser-based conversion tools. Your data never leaves your device.',
  },
};

export default function ConvertersPage() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Techolyze Converters Hub',
      description: 'Main entry point for all free converter tools on Techolyze.',
      url: pageUrl,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: converterLinks,
      },
    },
    {
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
          item: pageUrl,
        },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer
        }
      }))
    }
  ];

  return (
    <main className="px-4 sm:px-6 md:px-12 py-12 md:py-20 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <header className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            Secure Online <span className="text-yellow-500">Converters</span>
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Fast, free, and privacy-focused. Our suite of professional tools processes your files locally in your browser—meaning your sensitive data never leaves your device.
          </p>
        </header>

        {/* Value Proposition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="font-bold text-xl text-zinc-900 dark:text-zinc-100">100% Secure</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Files are processed client-side via JavaScript. Zero server uploads.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="font-bold text-xl text-zinc-900 dark:text-zinc-100">Lightning Fast</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              No waiting in queues or downloading heavy software. Instant results.
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-white dark:bg-zinc-900 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center mb-4">
              <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="font-bold text-xl text-zinc-900 dark:text-zinc-100">Completely Free</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              No daily limits, no paywalls, and no hidden subscriptions.
            </p>
          </div>
        </div>

        {/* Converter Grid by Category */}
        <div className="space-y-12">
          {converterCategories.map((group) => (
            <section key={group.category}>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                {group.category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.items.map((converter) => (
                  <Link
                    key={converter.href}
                    href={converter.href}
                    className="group flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-yellow-400 dark:hover:border-yellow-500"
                  >
                    <div>
                      <div className="mb-4">
                        {converter.icon}
                      </div>
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                        {converter.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {converter.description}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center text-sm font-semibold text-yellow-600 dark:text-yellow-500">
                      Launch Tool
                      <svg className="ml-1 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* FAQ Section */}
        <section className="mt-20 pt-16 border-t border-zinc-200 dark:border-zinc-800">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Frequently Asked Questions</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{faq.question}</h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}