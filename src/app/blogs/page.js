import Link from 'next/link';
import { FileText } from 'lucide-react';
import { getBlogs } from '@/actions/blogs';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import FeaturedPosts from '@/components/FeaturedPosts';
import {
  generateDocumentMetadata,
  generateDocumentStructuredData,
  generateWebsiteStructuredData,
} from '@/lib/seo-utils';

export default async function BlogsPage() {
  const page = 1;
  const result = await getBlogs(page, 12);

  const { blogs = [], pagination = {} } = result.success
    ? result
    : { blogs: [], pagination: {} };

  // Enhance the pagination object with hasPrev and hasNext flags
  const enhancedPagination = pagination ? {
    ...pagination,
    hasPrev: pagination.currentPage > 1,
    hasNext: pagination.hasMore || pagination.currentPage < pagination.totalPages
  } : {};

  // Add category for each blog if it doesn't exist
  const enhancedBlogs = blogs.map(blog => ({
    ...blog,
    tags: blog.tags || ['General'],
  }));

  return (
    <div className="mt-16 min-h-screen bg-[#171717] overflow-hidden relative">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            generateWebsiteStructuredData(),
            generateDocumentStructuredData({
              type: 'Blog',
              name: 'Techolyze Blog',
              description: 'Educational articles, tutorials, and insights for students and learners',
              url: '/blogs',
              breadcrumbs: [
                { name: 'Home', url: '/' },
                { name: 'Blogs', url: '/blogs' },
              ],
              items: enhancedBlogs.slice(0, 13).map(blog => ({
                title: blog.title,
                description: blog.excerpt || blog.description,
                url: `/blogs/${blog.slug}`,
                type: 'BlogPosting',
                subject: blog.tags?.[0] || 'Education',
              })),
              totalItems: pagination?.totalCount || enhancedBlogs.length,
              dateModified: enhancedBlogs[0]?.updatedAt || new Date().toISOString(),
            }),
          ]),
        }}
      />


    

      {/* Featured Posts Section */}
      {enhancedBlogs.length > 0 && (
        <section className="relative py-12 !px-4 !sm:px-6 !lg:px-12" id='first'>
          <FeaturedPosts blogs={enhancedBlogs} />
        </section>
      )}

      {/* Latest Posts Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Liquid Badge */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-block mb-4 group">
                <div className="backdrop-blur-3xl bg-gradient-to-r from-neutral-900/60 via-neutral-800/40 to-neutral-900/60 border border-neutral-800/80 rounded-full px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <span className="text-xs font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent tracking-wide">LATEST POSTS</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl !font-light text-white mb-2 bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent">Latest Blog Posts</h2>
              <p className="text-lg text-neutral-400 !font-light">Stay updated with the newest articles and insights</p>
            </div>
          </div>

          {/* Content */}
          <>
            {/* Blog Grid */}
            <div className="flex flex-col gap-6">
              {blogs.slice(3).map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-16 flex justify-center">
              <Pagination
                pagination={enhancedPagination}
                baseUrl="/blogs"
              />
            </div>
          </>
        </div>
      </section>
    </div>
  );
}

// Generate dynamic metadata
export async function generateMetadata() {
  const title = 'Educational Blogs & Articles - Techolyze';
  const description = 'Read the latest educational articles, tutorials, study tips, and insights from experts. Learn about programming, data structures, web development, and more.';
  const keywords = [
    'educational blogs',
    'programming tutorials',
    'study tips',
    'computer science articles',
    'web development',
    'data structures',
    'algorithms',
    'student resources',
    'learning materials',
    'tech education',
  ];

  return generateDocumentMetadata({
    title,
    description,
    keywords,
    url: '/blogs',
    canonical: '/blogs',
    type: 'website',
    images: [
      {
        url: '/og-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'Techolyze Blog - Educational Articles & Tutorials',
      },
    ],
  });
}

// Main page can be static as blogs don't have filters
export const dynamic = 'force-static';
export const revalidate = false;