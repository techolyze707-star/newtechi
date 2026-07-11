import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Globe, Twitter, Linkedin } from 'lucide-react';
import { getAuthorBySlug } from '@/actions/authors';
import { getBlogsByAuthor } from '@/actions/blogs';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';

/**
 * Generate static paths for all authors at build time
 */
export async function generateStaticParams() {
  try {
    const { getAuthors } = await import('@/actions/authors');
    const result = await getAuthors();

    if (!result.success || !result.authors) {
      return [];
    }

    return result.authors.map((author) => ({
      slug: author.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for authors:', error);
    return [];
  }
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getAuthorBySlug(slug);

  if (!result.success) {
    return {
      title: 'Author Not Found - Techolyze',
      description: 'The author you are looking for could not be found.',
      robots: {
        index: false,
        follow: true,
      }
    };
  }

  const { author } = result;

  return {
    title: `${author.name} - Author Profile | Techolyze`,
    description: author.bio,
    keywords: `${author.name}, author, blog writer, educational content, Techolyze`,
    openGraph: {
      title: `${author.name} - Author Profile`,
      description: author.bio,
      type: 'profile',
      url: `/authors/${slug}`,
      images: [
        {
          url: author.avatar,
          width: 400,
          height: 400,
          alt: author.name,
        },
      ],
    },
    twitter: {
      card: 'summary',
      title: `${author.name} - Author Profile`,
      description: author.bio,
      images: [author.avatar],
    },
  };
}

/**
 * Disable automatic ISR - only use manual revalidation
 */
export const revalidate = false;


/**
 * Author Profile Page
 */
export default async function AuthorPage({ params, searchParams }) {
  const { slug } = await params;
  
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page || 1);
  const limit = 6;
  
  const [authorResult, blogsResult] = await Promise.all([
    getAuthorBySlug(slug),
    getBlogsByAuthor(slug, page, limit)
  ]);

  if (!authorResult.success) {
    notFound();
  }

  const { author } = authorResult;
  const { blogs = [], pagination = {} } = blogsResult.success ? blogsResult : { blogs: [], pagination: {} };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            mainEntity: {
              '@type': 'Person',
              name: author.name,
              description: author.bio,
              image: author.avatar,
              email: author.email,
              sameAs: [
                author.social?.twitter,
                author.social?.linkedin,
                author.social?.website,
              ].filter(Boolean),
            },
          }),
        }}
      />

      <div className="min-h-screen bg-[#171717] text-white">
        {/* Back Navigation */}
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-yellow-400 transition-colors text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blogs</span>
          </Link>
        </nav>

        {/* Author Header */}
        <section className="bg-gradient-to-br from-zinc-900 via-neutral-950 to-zinc-900 border-b border-zinc-800/80 py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Author Avatar */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-zinc-800 shadow-2xl">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={160}
                    height={160}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Author Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {author.name}
                </h1>
                <p className="text-lg text-zinc-300 mb-6 max-w-2xl">
                  {author.bio}
                </p>

                {/* Social Links */}
                <div className="flex items-center justify-center md:justify-start gap-4">
                  {author.social?.website && (
                    <a
                      href={author.social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-yellow-400 transition-colors"
                      aria-label="Visit website"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  )}
                  {author.social?.twitter && (
                    <a
                      href={author.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-yellow-400 transition-colors"
                      aria-label="Twitter profile"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {author.social?.linkedin && (
                    <a
                      href={author.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-zinc-400 hover:text-yellow-400 transition-colors"
                      aria-label="LinkedIn profile"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author's Blog Posts */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Articles by {author.name}
            <span className="text-yellow-400 text-xl ml-3">({pagination?.totalCount || blogs.length})</span>
          </h2>

          {blogs.length > 0 ? (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-6">
                {blogs.map((blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-8 flex justify-center">
                <Pagination
                  pagination={{
                    ...pagination,
                    hasPrev: pagination.currentPage > 1,
                    hasNext: pagination.hasMore || pagination.currentPage < pagination.totalPages
                  }}
                  baseUrl={`/authors/${slug}`}
                  useQueryParam={true}
                />
              </div>
            </div>
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-12 text-center">
              <p className="text-zinc-400 text-lg">
                No published articles yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
