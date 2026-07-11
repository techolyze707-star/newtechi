import "./globals.css";
import LayoutContent from "@/components/LayoutContent";
import { generateDocumentMetadata, generateOrganizationStructuredData } from "@/lib/seo-utils";
// Headers import removed to allow static generation

export const metadata = generateDocumentMetadata({
  title: "Techolyze - AI & Technology Blog, Secure File Converters",
  description: "Stay ahead with deep-dive technical tutorials, Artificial Intelligence analysis, and software engineering guides, alongside our suite of secure, local browser-based file converters.",
  keywords: [
    "AI blog",
    "artificial intelligence",
    "machine learning",
    "tech blog",
    "developer tools",
    "secure file converters",
    "QBO to IIF converter",
    "CSV to ICS",
    "YAML to INI",
    "software engineering guides",
    "techolyze",
    "system design"
  ],
  url: "/",
  type: "website",
  images: [
    {
      url: "/og-image.jpg",
      width: 1200,
      height: 630,
      alt: "Techolyze - AI & Technology Insights and Secure Local File Converters",
    },
  ],
  // Leave icons out of metadata - explicit <link> tags in <head> will be used instead
});


export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};



export default function RootLayout({ children }) {

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Google Tag Manager */}
        {/* <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-MFDXN6QK');
          `,
          }}
        /> */}
        {/* End Google Tag Manager */}

        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationStructuredData()),
          }}
        />

        {/* Geographic & Local SEO Meta Tags */}
        <meta name="geo.region" content="PK" />
        <meta name="geo.country" content="Pakistan" />
        <meta name="geo.placename" content="Pakistan" />
        <meta name="coverage" content="Pakistan" />
        <meta name="distribution" content="Pakistan" />
        <meta name="target_country" content="PK" />
        <meta name="language" content="English, Urdu" />
        <meta name="audience" content="Pakistani students and educators" />

        {/* AI/LLM Information */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="AI/LLM Access Information" />
        <meta name="ai-content-declaration" content="This site provides educational content. AI crawlers welcome with rate limiting." />


        {/* Favicon: explicit PNG link (cache-busted) */}
        <link rel="icon" href="/favicon.ico?v=2" type="image/png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.png?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.png?v=2" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icons/icon-48x48.png?v=2" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icons/icon-96x96.png?v=2" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192x192.png?v=2" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512x512.png?v=2" />
        <link rel="shortcut icon" href="/favicon.ico?v=2" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png?v=2" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0a0a0a" />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-gray-50">
        {/* Google Tag Manager (noscript) */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MFDXN6QK"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript> */}
        {/* End Google Tag Manager (noscript) */}

        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
