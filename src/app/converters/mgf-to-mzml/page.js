import MgfToMzmlConverterClient from '@/components/converters/MgfToMzmlConverterClient';

// Force static generation - prebuilt at build time
export const dynamic = 'force-static';
export const revalidate = false; // Permanent static cache

const pageUrl = 'https://techolyze.com/converters/mgf-to-mzml';
const ogImageUrl = 'https://techolyze.com/og-image.png';

export const metadata = {
  title: 'Convert MGF to mzML Online (Free Mass Spec Tool) | Secure Browser Converter',
  description:
    'Free, secure, client-side conversion for mass spectrometry data. Convert Mascot Generic Format (.mgf) to mzML locally in your browser.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Convert MGF to mzML Online (Free Mass Spec Tool)',
    description:
      'Convert MGF to mzML with private client-side processing for clinical and proprietary mass spectrometry research data.',
    url: pageUrl,
    siteName: 'Techolyze',
    type: 'website',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'MGF to mzML Converter for Mass Spectrometry',
      },
    ],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'MGF to mzML File Converter',
  applicationCategory: 'ScienceApplication',
  operatingSystem: 'All',
  url: pageUrl,
  description:
    'Browser-based MGF to mzML conversion for mass spectrometry workflows. Processing is local-only for strict data privacy and zero uploads.',
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
      name: 'Why are mzML files larger than MGF?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'mzML stores metadata-rich XML plus encoded binary arrays, which generally increases file size compared with plain-text MGF peak lists.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this converter safe for proprietary LC-MS/MS data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Conversion runs completely in browser memory. No spectra or metadata are uploaded to remote servers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this output support downstream mzML tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The generated mzML includes core spectrum and binary array structures suitable for many workflows. Validate with your target pipeline if strict metadata requirements apply.',
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

      <MgfToMzmlConverterClient />

      <section className="g-px pb-20">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 md:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How to convert MGF to mzML online.
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 1: Upload your MGF peak list file</h3>
            <p>Drag and drop your .mgf file or browse from local storage.</p>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 2: Wait for local parsing and encoding</h3>
            <p>
              The converter parses each BEGIN IONS block, extracts metadata and peak pairs, then encodes m/z and
              intensity arrays to Base64.
            </p>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 3: Download your mzML XML output</h3>
            <p>Save the generated .mzML file and continue with your downstream analysis pipeline.</p>
          </div>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Is it safe to process proprietary mass spec data online?
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            Yes. This tool uses a local-first architecture where all parsing and XML generation happen inside your
            browser memory. No backend APIs are used and no research data is transmitted to external servers.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            What is an MGF file?
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            MGF (Mascot Generic Format) is a text-based format that stores MS/MS peak lists in spectrum blocks
            marked by BEGIN IONS and END IONS, often with metadata fields such as TITLE, PEPMASS, and CHARGE.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            What is an mzML file?
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            mzML is the HUPO-PSI XML standard for mass spectrometry data exchange. It combines structured metadata
            with encoded binary arrays for m/z and intensity values, making it interoperable across bioinformatics
            software ecosystems.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-5 space-y-6 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Why are mzML files larger than MGF?
              </h3>
              <p className="mt-2">
                mzML uses XML markup and embeds Base64-encoded arrays, so output is typically larger than compact
                text-only peak list formats.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Can I convert large MGF files in-browser?
              </h3>
              <p className="mt-2">
                Yes. Performance depends on available RAM and browser limits, but this converter is optimized for
                staged processing and efficient array encoding.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Is this suitable for clinical and confidential data?
              </h3>
              <p className="mt-2">
                The conversion is client-side only, which supports strict privacy requirements. Always follow your
                institutional data governance policies.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
