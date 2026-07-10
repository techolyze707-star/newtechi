import Script from 'next/script';
import CsvToIcsConverterClient from '@/components/converters/CsvToIcsConverterClient';

// Force static generation - prebuilt at build time
export const dynamic = 'force-static';
export const revalidate = false; // Permanent static cache

const pageUrl = 'https://techolyze.com/converters/csv-to-ics';
const ogImageUrl = 'https://techolyze.com/og-image.png';

export const metadata = {
  title: 'Convert CSV to ICS Online (Bulk Calendar Import) | Free CSV to iCalendar Tool',
  description:
    'Free, instant, and secure. Convert Excel/CSV event lists to iCalendar (.ics) format locally in your browser for Google Calendar & Outlook.',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Convert CSV to ICS Online (Bulk Calendar Import)',
    description:
      'Convert Excel and CSV event lists into iCalendar .ics files instantly with local processing for private, zero-upload calendar imports.',
    url: pageUrl,
    siteName: 'Techolyze',
    type: 'website',
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: 'CSV to ICS Bulk Calendar Import Tool',
      },
    ],
  },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CSV to ICS File Converter',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'All',
  url: pageUrl,
  description:
    'Free CSV to ICS converter for bulk calendar imports. Process event spreadsheets locally in your browser with zero-upload privacy.',
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
      name: 'Can I map custom CSV headers before converting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. After upload, you map each required calendar field using dropdowns populated from your exact CSV headers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this CSV to ICS converter safe for private event data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Parsing and conversion happen entirely in your browser. Your spreadsheet is not uploaded to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'Will the generated ICS file work in Google Calendar and Outlook?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tool generates standards-based iCalendar output that imports into Google Calendar, Outlook, and most ICS-compatible calendar apps.',
      },
    },
  ],
};

export default function Page() {
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.2/papaparse.min.js"
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

      <CsvToIcsConverterClient />

      <section className="g-px pb-20">
        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-black/20 md:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How to convert a CSV spreadsheet to an ICS calendar file.
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 1: Upload your CSV event file</h3>
            <p>
              Drop your .csv file into the upload area. The converter reads headers and rows locally in your
              browser.
            </p>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 2: Map columns to calendar fields</h3>
            <p>
              Match your custom CSV headers to Event Title, Start Date/Time, End Date/Time, Description, and
              Location using the mapping dropdowns.
            </p>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Step 3: Generate and download ICS</h3>
            <p>
              Click Generate ICS File, then download your .ics file for bulk import to Google Calendar or Outlook.
            </p>
          </div>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How to format your CSV for calendar import.
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            Keep each event on its own row and include clear date/time values. Example headers: Title, Start,
            End, Description, Location. If your headers differ, the mapping step lets you match them manually.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            How to import ICS to Google Calendar and Outlook.
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            In Google Calendar, use Settings then Import and select your .ics file. In Outlook, choose Open &
            Export, then Import/Export and select iCalendar (.ics). Review timezone and duplicates before final
            confirmation.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Is my event data private?
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            Yes. This tool uses zero-upload client-side processing, meaning your event spreadsheet remains on your
            machine throughout parsing, mapping, and ICS generation.
          </p>

          <h2 className="mt-10 text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <div className="mt-5 space-y-6 text-sm leading-7 text-neutral-700 dark:text-neutral-200 md:text-base">
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                What date format should I use in the CSV?
              </h3>
              <p className="mt-2">
                Use consistent date formats like ISO (YYYY-MM-DD HH:mm) for best results. The converter attempts
                to parse most standard date/time strings.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Can I leave description or location empty?
              </h3>
              <p className="mt-2">
                You should map all required fields in this tool flow, but empty values in rows are still allowed
                and simply produce blank ICS fields.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Does this support bulk event migration?
              </h3>
              <p className="mt-2">
                Yes. The converter is built for bulk import scenarios and generates VEVENT blocks for each valid
                CSV row.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
