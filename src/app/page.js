import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import { FeaturedCard } from '@/components/FeaturedCard'; // Adjusted path if it lives in components
import { getLatestBlogs } from '@/actions/blogs';
import NewsLetter from '@/components/newsletter';
import SectionHeader from '@/components/sectionHeader/SectionHeader';
import NewsHero from '@/components/NewsHero';
import { getCoverImageData } from '@/lib/blog-utils';
import StatsSection from '@/components/home/StatsSection';
import FutureTechSection from '@/components/home/techFeatureSection/FutureTechSection';

export default async function Home() {
  const blogsResult = await getLatestBlogs(20);
  const { blogs } = blogsResult.success ? blogsResult : { blogs: [] };

  // Extract the first blog as the high-visibility Featured Post
  const featuredBlog = blogs[0];

  // Distribute the remaining items dynamically across the lists below
  const mainFeedBlogs = blogs.slice(1, 14);
  const sidebarBlogs = blogs.slice(14, 18);
  const coverImageData = getCoverImageData(featuredBlog.coverImage);

  return (
    <div className="bg-[#171717] min-h-screen text-white">
      {/* Latest Blogs Section */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header Hero */}
          <NewsHero />

          {/* Premium Featured Card Stack */}
          {featuredBlog && (
            <div className="mb-16 border-b border-neutral-800 pb-16">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase text-yellow-400">
                  Featured Publication
                </span>
              </div>
              <FeaturedCard
                slug={featuredBlog.slug || featuredBlog._id}
                type={featuredBlog.type || "tech"}
                image={featuredBlog.coverImage || featuredBlog.coverImage}
                title={featuredBlog.title}
                description={featuredBlog.description || featuredBlog.excerpt}
                isVideo={featuredBlog.isVideo}
                author={featuredBlog.author?.name || featuredBlog.author}
                category={featuredBlog.category}
                date={featuredBlog.createdAt || featuredBlog.date}
                readTimeText={featuredBlog.readTime}
              />
            </div>
          )}



          {/* Core Content Grid */}
          {blogs.length > 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start mb-16">

              {/* Left Column: Latest Feed Grid */}
              <div className="lg:col-span-2 flex flex-col gap-8">
                <div className="border-b border-neutral-800 pb-3">
                  <h2 className="text-xs font-bold tracking-wider uppercase text-neutral-400">
                    Latest Technical Insights
                  </h2>
                </div>
                <div className="flex flex-col gap-6">
                  {mainFeedBlogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                  ))}
                </div>
              </div>

              {/* Right Column: Mini Sidebar Feed */}
              {sidebarBlogs.length > 0 && (
                <div className="lg:sticky lg:top-24 bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl flex flex-col gap-6">
                  <div className="border-b border-neutral-800 pb-3">
                    <h2 className="text-xs font-bold tracking-wider uppercase text-yellow-400">
                      Trending Now
                    </h2>
                  </div>
                  <div className="flex flex-col gap-4">
                    {sidebarBlogs.map((blog) => (
                      <Link
                        key={blog._id}
                        href={`/blogs/${blog.slug || blog._id}`}
                        className="group flex flex-col gap-1 py-2 border-b border-neutral-800/60 last:border-none last:pb-0"
                      >
                        <span className="text-xs text-neutral-500 uppercase font-medium">
                          {blog.category || "Technology"}
                        </span>
                        <h3 className="text-base font-semibold text-neutral-200 group-hover:text-yellow-400 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-yellow-400 mt-1 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0">
                          <span>Read article</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
        <SectionHeader
          heading={"Future Technology Blog"}
          badge={"FutureTech Features"}
        />
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <FutureTechSection />
        </div>


        {/* Section Footer & Newsletter */}
        {/* Statistics Section */}
        <NewsLetter />
      </section>

    </div>
  );
}