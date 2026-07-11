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
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

export default async function BlogsPageNumber({ params }) {
    const { pageNumber } = await params;
    const page = parseInt(pageNumber) || 1;
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

    const middleBlogs = page === 1 ? blogs.slice(3, 12) : blogs.slice(0, 12);
    const sidebarBlogs = blogs.slice(12, 17);

  return (
    <div className="min-h-screen bg-[#171717] relative">
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
        {/* Hero Section - Only show on first page */}
        {page === 1 && (
            <section className="relative pt-32 pb-12 ">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side Content */}
                        <div className="space-y-6">
                            {/* Premium Badge */}
                            <div className="inline-block group">
                                <div className="relative border border-zinc-800 rounded-full px-6 py-3 bg-zinc-900 transition-all duration-500 hover:scale-105 overflow-hidden">
                                    <span className="relative text-xs font-medium text-yellow-400 tracking-wide">COMMUNITY KNOWLEDGE</span>
                                </div>
                            </div>

                            {/* Main Heading */}
                            <div className="space-y-3">
                                <h1 className="text-5xl md:text-6xl lg:text-6xl font-light text-white leading-tight tracking-tight">
                                    <span className="block">
                                        Explore Our
                                    </span>
                                    <span className="block text-yellow-400">
                                        Blog Collection
                                    </span>
                                </h1>
                                <div className="w-24 h-0.5 bg-yellow-400 rounded-full"></div>
                            </div>

                            {/* Subheading */}
                            <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl font-normal">
                                Discover insightful articles, tutorials, and knowledge shared by our community. Learn from experts and grow your skills.
                            </p>

                            {/* CTA Button */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Link
                                    href="#first"
                                    className="group relative px-6 py-3 bg-yellow-400 text-neutral-900 font-semibold text-sm rounded-xl overflow-hidden transition-all duration-500 hover:bg-yellow-500 hover:scale-105 active:scale-95 w-fit"
                                >
                                    <div className="relative flex items-center justify-center space-x-2">
                                        <FileText className="h-4 w-4 text-neutral-900 transition-all duration-300" />
                                        <span>Explore Blogs</span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        {/* Right Side - Vector Sketch Elements */}
                        <div className="relative h-[500px] hidden lg:block">
                            {/* Floating Vector Elements */}
                            <div className="absolute inset-0 pointer-events-none">
                                {/* Badge - Top Right */}
                                <div className="absolute top-0 right-0 w-40 h-14 bg-zinc-900 border-2 border-zinc-800 rounded-full shadow-xl p-3">
                                    <div className="flex items-center justify-between h-full px-2">
                                        <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600"></div>
                                        <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
                                    </div>
                                </div>

                                {/* Half Badge - Top Right */}
                                <div className="absolute top-20 right-12 w-32 h-16 bg-gradient-to-b from-zinc-800 to-transparent border-l-2 border-b-2 border-zinc-800 rounded-bl-3xl p-3 animate-bounce" style={{ animationDuration: '4s' }}>
                                    <div className="space-y-1">
                                        <div className="w-3/4 h-1.5 bg-zinc-700 rounded-full"></div>
                                        <div className="w-1/2 h-1 bg-zinc-800 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Full Circle - Right Side Middle */}
                                <div className="absolute top-1/3 right-4 w-24 h-24 border-2 border-zinc-800 rounded-full shadow-xl animate-spin" style={{ animationDuration: '20s' }}>
                                    <div className="w-full h-full flex items-center justify-center">
                                        <div className="w-14 h-14 bg-zinc-900 rounded-full border border-zinc-800"></div>
                                    </div>
                                </div>

                                {/* Rectangle with rounded corners - Left Center */}
                                <div className="absolute top-2/3 left-0 w-36 h-20 bg-zinc-900 border-2 border-zinc-800 rounded-3xl shadow-lg p-3">
                                    <div className="space-y-2">
                                        <div className="w-full h-2 bg-zinc-800 rounded-full"></div>
                                        <div className="w-4/5 h-1.5 bg-zinc-800 rounded-full"></div>
                                        <div className="w-3/5 h-1.5 bg-zinc-800 rounded-full"></div>
                                    </div>
                                </div>

                                {/* Vector Card 1 - Top Center */}
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-40 bg-zinc-900 border-2 border-zinc-800 rounded-3xl shadow-xl p-4">
                                    <div className="space-y-2">
                                        <div className="w-full h-3 bg-zinc-800 rounded-full"></div>
                                        <div className="w-4/5 h-2 bg-zinc-800 rounded-full"></div>
                                        <div className="w-3/5 h-2 bg-zinc-800 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )}

        {/* Featured Posts Section - Only on first page */}
        {page === 1 && enhancedBlogs.length > 0 && (
            <section className="relative py-12 !px-4 !sm:px-6 !lg:px-12" id='first'>
                <FeaturedPosts blogs={enhancedBlogs} />
            </section>
        )}

        {/* Latest Posts Section */}
        <section className="relative py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header with Liquid Badge */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <div className="inline-block mb-4 group">
                            <div className="border border-zinc-800 rounded-full px-4 py-2 bg-zinc-900 shadow-lg transition-all duration-300">
                                <span className="text-xs font-medium text-yellow-400 tracking-wide">
                                    {page === 1 ? 'LATEST POSTS' : `PAGE ${page}`}
                                </span>
                            </div>
                        </div>
                        <h2 className="text-4xl md:text-5xl !font-light text-white mb-2">
                            {page === 1 ? 'Latest Blog Posts' : `Blog Posts - Page ${page}`}
                        </h2>
                        <p className="text-lg text-zinc-400 !font-light">
                            {page === 1 ? 'Stay updated with the newest articles and insights' : `Showing page ${page} of ${pagination.totalPages}`}
                        </p>
                    </div>
                </div>

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

// Generate dynamic static params for all blog pages
export async function generateStaticParams() {
    const result = await getBlogs(1, 17);

    if (!result.success || !result.pagination) {
        return [{ pageNumber: '1' }];
    }

    const { totalPages } = result.pagination;

    // Generate params for all pages
    return Array.from({ length: totalPages }, (_, i) => ({
        pageNumber: String(i + 1)
    }));
}

// Generate dynamic metadata
export async function generateMetadata({ params }) {
    const { pageNumber } = await params;
    const page = parseInt(pageNumber) || 1;

    let title = 'Educational Blogs & Articles - Techolyze';
    let description = 'Read the latest educational articles, tutorials, study tips, and insights from experts. Learn about programming, data structures, web development, and more.';
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

    if (page > 1) {
        title = `Educational Blogs & Articles - Page ${page} | Techolyze`;
        description = `Browse educational articles and tutorials - Page ${page}. Expert insights on programming, computer science, and study strategies.`;
    }

    return generateDocumentMetadata({
        title,
        description,
        keywords,
        url: '/blogs',
        canonical: page > 1 ? `/blogs/page/${page}` : '/blogs',
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

export const dynamic = 'force-static';
export const revalidate = false; // Never revalidate automatically

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
