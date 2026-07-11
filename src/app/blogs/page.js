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
import SectionHeader from '@/components/sectionHeader/SectionHeader';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default async function BlogsPage() {
  const page = 1;
  const result = await getBlogs(page, 17);

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

  const middleBlogs = blogs.slice(3, 12);
  const sidebarBlogs = blogs.slice(12, 17);

  return (
    <div className="mt-16 min-h-screen bg-[#171717] relative">
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
      <SectionHeader badge={"FEATURED COLLECTION"} heading={"Latest Blog Posts"} />
      {/* Latest Posts Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with Liquid Badge */}
          {/* <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-block mb-4 group">
                <div className="bg-zinc-900/60 border border-zinc-800 rounded-full px-4 py-2 shadow-lg transition-all duration-300">
                  <span className="text-xs font-medium text-yellow-400 tracking-wide">FEATURED COLLECTION</span>
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl !font-light text-white mb-2 bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent">Latest Blog Posts</h2>
              <p className="text-lg text-neutral-400 !font-light">Stay updated with the newest articles and insights</p>
            </div>
          </div> */}

          {/* Content */}
          <>
            {/* Blog Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Middle Feed */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                {middleBlogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              {/* Side Feed */}
              {sidebarBlogs.length > 0 && (
                <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
                  <div className="py-6">
                    <h3 className="text-xl md:text-2xl font-semibold mb-6 relative pb-3 text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-[3px] after:bg-gradient-to-r after:from-yellow-500 after:to-yellow-500">
                      Latest
                    </h3>
                    <div className="flex flex-col gap-4">
                      {sidebarBlogs.map((blog) => (
                        <BlogCardVergeStyle
                          key={blog._id}
                          slug={blog.slug}
                          title={blog.title}
                          imageUrl={blog.coverImage?.url}
                          time={formatDate(blog.createdAt)}
                          author={blog.author?.name || (typeof blog.author === 'string' ? blog.author : 'Anonymous')}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
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

function BlogCardVergeStyle({ slug, title, imageUrl, time, author }) {
  return (
    <Link href={`/blogs/${slug}`} className="group flex gap-4 items-start py-3 border-b border-zinc-800/60 last:border-none last:pb-0">
      {imageUrl && (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-zinc-800">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-neutral-200 group-hover:text-yellow-400 transition-colors line-clamp-2 leading-snug">
          {title}
        </h4>
        <div className="flex items-center gap-2 mt-2 text-[11px] text-zinc-500">
          <span className="uppercase font-medium text-zinc-400">{author}</span>
          <span>•</span>
          <span>{time}</span>
        </div>
      </div>
    </Link>
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