export default function robots() {
  const baseUrl = 'https://Techolyze.dev';

  return {
    rules: [
      // General crawlers (Fixed to allow static assets)
      {
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/', // Allow CSS and JS chunks for rendering
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',       // Blocks sensitive build info but allows static via the rule above
          '/private/',
        ],
        crawlDelay: 1,
      },
      // Google crawlers - Optimized for maximum rendering capability
      {
        userAgent: [
          'Googlebot',
          'Googlebot-Image',
          'Googlebot-News',
          'Googlebot-Video',
        ],
        allow: [
          '/',
          '/_next/static/', 
        ],
        disallow: ['/api/', '/admin/'],
      },
      // Bing crawler
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/_next/static/',
        ],
        disallow: ['/api/', '/admin/'],
      },
      // AI/LLM crawlers - Structured to allow specific content areas
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
          'ClaudeBot',
          'Google-Extended',
          'Applebot-Extended',
          'FacebookBot',
          'cohere-ai',
          'PerplexityBot',
          'Omgilibot',
          'Bytespider',
          'Diffbot',
        ],
        allow: [
          '/_next/static/', // AI bots need CSS/JS to "read" rendered content too
          '/blogs/',
          '/documents/',
          '/quiz/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
        ],
        crawlDelay: 2,
      },
      // Social media crawlers (Must see CSS/JS for proper link previews)
      {
        userAgent: [
          'facebookexternalhit',
          'Twitterbot',
          'LinkedInBot',
          'WhatsApp',
          'TelegramBot',
        ],
        allow: [
          '/',
          '/_next/static/',
        ],
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/academics-sitemap.xml`,
    ],
    host: baseUrl,
  };
}