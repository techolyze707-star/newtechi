import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { getCoverImageData } from '@/lib/blog-utils';

function CategoryBadge({ category }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-400 text-neutral-900">
      {category}
    </span>
  );
}

export default function BlogCard({ blog }) {
  // Normalize cover image data so empty strings and partial objects fall back safely.
  const coverImageData = getCoverImageData(blog.coverImage);

  const slug = blog.slug;
  const title = blog.title;
  const description = blog.excerpt || '';
  const isVideo = blog.isVideo || false;
  const author = blog.author?.name || (typeof blog.author === 'string' ? blog.author : 'Anonymous');
  const category = blog.category || 'AI';
  const date = blog.createdAt || new Date().toISOString();

  // Calculate approximate read time if not provided
  const readTimeText = blog.readTimeText || (blog.content ? `${Math.ceil(blog.content.split(/\s+/).length / 200)} min read` : null);

  return (
    <article
      className="group flex flex-col md:flex-row items-stretch md:items-center justify-start w-full border-b border-neutral-800 py-8 md:py-12 gap-5 md:gap-6 transition rounded-sm hover:shadow-md pr-2"
      aria-labelledby={`post-title-${slug}`}
    >
      {/* Left Image */}
      <figure className="relative w-full aspect-video md:aspect-auto md:w-64 md:h-44 rounded-sm overflow-hidden border border-neutral-850 bg-neutral-900 shrink-0">
        <Image
          src={coverImageData.url}
          alt={coverImageData.alt || blog.title}
          fill
          sizes="(max-width: 768px) 100vw, 256px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isVideo && (
          <figcaption className="sr-only">This post includes a video</figcaption>
        )}
      </figure>

      {/* Right Content */}
      <div className="flex flex-col justify-center gap-2 md:gap-3 flex-1 mt-3 md:mt-0">
        <div className="flex items-center gap-2">
          <CategoryBadge category={category} />
        </div>

        <h2
          id={`post-title-${slug}`}
          className="text-white text-lg md:text-xl font-semibold leading-tight"
        >
          <Link
            href={`/blogs/${slug}`}
            className="group-hover:underline group-hover:decoration-yellow-400 group-hover:drop-shadow-md transition text-[20px] md:text-[24px] font-bold leading-snug md:leading-[24px]"
          >
            {title}
          </Link>
        </h2>

        <p className="hidden md:block text-neutral-400 text-sm md:text-[16px] font-medium leading-relaxed md:leading-[22px] line-clamp-3">
          {description}
        </p>

        <footer className="flex items-center text-[11px] text-neutral-500 gap-3 mt-1 md:mt-2 flex-wrap">
          <span className="text-neutral-400 uppercase">{author}</span>
          <span aria-hidden="true" className="text-neutral-600">|</span>
          <time dateTime={date}>{formatDate(date)}</time>
          {readTimeText && (
            <>
              <span aria-hidden="true" className="text-neutral-600">|</span>
              <span>{readTimeText}</span>
            </>
          )}
        </footer>
      </div>
    </article>
  );
}