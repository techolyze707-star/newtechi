import { getBlogs } from '@/actions/blogs';

export const dynamic = 'force-dynamic';

// Helper function to safely parse dates
function safeDate(dateValue, fallback = new Date()) {
  if (!dateValue) return fallback;

  const date = new Date(dateValue);
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return fallback;
  }

  return date;
}

export default async function sitemap() {
  const baseUrl = 'https://techolyze.com';

  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },

    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/converters`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/converters/qbo-to-iif`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/converters/csv-to-ics`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/converters/yml-to-ini`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/converters/xcal-to-bin`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/converters/bin-to-xcal`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/converters/mgf-to-mzml`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/converters/unicode-to-preeti`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  
  
  ];

  // Get all blogs
  let blogRoutes = [];
  try {
    const blogsResult = await getBlogs(1, 100); // Get first 100 blogs
    if (blogsResult.success && blogsResult.blogs) {
      blogRoutes = blogsResult.blogs
        .filter(blog => blog && blog.slug) // Filter out invalid blogs
        .map((blog) => ({
          url: `${baseUrl}/blogs/${blog.slug}`,
          lastModified: safeDate(blog.updatedAt || blog.createdAt),
          changeFrequency: 'weekly',
          priority: 0.7,
        }));
    }
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
  }

  return [...staticRoutes, ...blogRoutes];
}