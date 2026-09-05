import LayoutContent from "@/components/LayoutContent";
import "./globals.css";
import { generateDocumentMetadata, generateOrganizationStructuredData } from "@/lib/seo-utils";
import Script from "next/script";
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

        {/* End Google Tag Manager */}

        <Script
          src="//scripts.mediavine.com/tags/9de9ab34-1859-43f4-a352-0427dd25af5a.js"
          strategy="afterInteractive"
          async
          data-noptimize="1"
          data-cfasync="false"
        />

        {/* Organization Structured Data */}
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationStructuredData()),
          }}
        />

        {/* AI/LLM Information */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="AI/LLM Access Information" />
        <meta name="ai-content-declaration" content="This site provides educational content. AI crawlers welcome with rate limiting." />

        {/* Favicon: explicit PNG link (cache-busted) */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <Script id="grow-me-initializer" strategy="afterInteractive">
          {`!(function(){window.growMe||((window.growMe=function(e){window.growMe.push(e);}),(window.growMe=[]));var e=document.createElement("script");(e.type="text/javascript"),(e.src="https://faves.grow.me/main.js"),(e.defer=!0),e.setAttribute("data-grow-faves-site-id","U2l0ZTo1Y2I4NGY4OC1jNGVjLTQ0ZDMtOGIwZS1mYzRlYTE3ZDg5YmQ=");var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t);})();`}
        </Script>
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-gray-50">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4YSDXLWQT3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4YSDXLWQT3');
          `}
        </Script>

        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
// h