import Script from 'next/script';
import YmlToIniConverterClient from '@/components/converters/YmlToIniConverterClient';

// Force static generation - prebuilt at build time
export const dynamic = 'force-static';
export const revalidate = false; // Permanent static cache

const pageUrl = 'https://techolyze.com/converters/yml-to-ini';
const ogImageUrl = 'https://techolyze.com/og-image.png';

export const metadata = {
  title: 'Convert YAML to INI Online (Free Config Tool) | Fast Secure YML Converter',
  description:
    'Free, instant, and secure client-side conversion. Paste your YML and get INI format instantly. Your config stays local in your browser.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Convert YAML to INI Online (Free Config Tool)',
    description:
      'Free, instant, and secure client-side YAML to INI conversion for developers. Sensitive configuration data never leaves your browser.',
    url: pageUrl,
    siteName: 'Techolyze',
    type: 'website',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'YML to INI Converter',
      },
    ],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'YML to INI Converter',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'All',
  url: pageUrl,
  description:
    'Convert YAML to INI instantly using local browser processing. Free developer tool for secure config transformation without server uploads.',
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
      name: 'Can this converter handle nested YAML objects?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Top-level objects become INI sections, and deeper nesting is flattened with dot notation keys.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my YAML configuration uploaded to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Parsing and conversion happen locally in your browser session for privacy and security.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if my YAML syntax is invalid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tool catches parser errors and displays a red error message in the output panel instead of crashing.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js"
        strategy="beforeInteractive"
      />

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

      <YmlToIniConverterClient />

      <section className="g-px pb-20">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 md:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How to Convert YAML to INI online.
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 1: Paste or upload YAML</h3>
            <p>
              Add your YAML text in the left panel or upload a .yml file to load your existing config quickly.
            </p>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 2: Review generated INI output</h3>
            <p>
              The converter parses and transforms YAML structure in real time, so the right panel updates as you
              type.
            </p>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 3: Copy or download the INI file</h3>
            <p>
              Use Copy to Clipboard for quick pasting into tools, or download a .ini file for deployment and
              migration tasks.
            </p>
          </div>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Is my configuration data safe?
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            Yes. This tool processes YAML data client-side in your browser memory only. Your environment values,
            credentials, and server settings are never uploaded to an external API or backend service.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How does the converter handle nested YAML?
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            Top-level objects are mapped into INI sections, while deeper nested keys are flattened using dot
            notation. For example, a nested key like database.connection.host becomes
            database.connection.host=127.0.0.1 inside the relevant section.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            What is a YAML (YML) file?
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            YAML is a human-readable configuration format widely used in Docker Compose files, Kubernetes
            manifests, CI/CD pipelines, and modern application deployment stacks.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            What is an INI file?
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            INI is a lightweight key/value configuration format with optional sections, popular in legacy Windows
            software and many simple app settings systems.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-5 space-y-6 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Can I convert large YAML files in this tool?
              </h3>
              <p className="mt-2">
                Yes. Performance depends on your device and browser, but most practical config files convert
                instantly in real time.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Are comments preserved from YAML?
              </h3>
              <p className="mt-2">
                No. YAML comments are not part of parsed data objects, so they are not included in generated INI
                output.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Does the converter support arrays and deep nesting?
              </h3>
              <p className="mt-2">
                Yes. Primitive arrays are serialized as comma-separated values, while nested objects are flattened
                using dot notation for INI compatibility.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
