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
      className="group flex flex-row items-center justify-start w-full border-b border-gray-200 dark:border-neutral-800 py-12 gap-6 transition rounded-sm hover:shadow-md pr-2"
      aria-labelledby={`post-title-${slug}`}
    >
      {/* Left Image */}
      <figure className="relative w-full md:w-64 h-44 md:h-44 rounded-sm overflow-hidden border border-gray-300 dark:border-neutral-700 shadow-inner shrink-0">
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
      <div className="flex flex-col justify-center gap-3 flex-1">
        <div className="flex items-center gap-2">
          <CategoryBadge category={category} />
        </div>

        <h2
          id={`post-title-${slug}`}
          className="text-gray-900 dark:text-white text-lg md:text-xl font-semibold leading-tight"
        >
          <Link
            href={`/blogs/${slug}`}
            className="group-hover:underline group-hover:decoration-yellow-400 group-hover:drop-shadow-md transition text-[24px] font-bold leading-[24px]"
          >
            {title}
          </Link>
        </h2>

        <p className="text-gray-700 dark:text-neutral-400 text-[16px] font-medium leading-[22px] line-clamp-3">
          {description}
        </p>

        <footer className="flex items-center text-[11px] text-gray-500 dark:text-neutral-500 gap-3 mt-2 flex-wrap">
          <span className="text-gray-600 dark:text-neutral-400 uppercase">{author}</span>
          <span aria-hidden="true" className="text-gray-400 dark:text-neutral-600">|</span>
          <time dateTime={date}>{formatDate(date)}</time>
          {readTimeText && (
            <>
              <span aria-hidden="true" className="text-gray-400 dark:text-neutral-600">|</span>
              <span>{readTimeText}</span>
            </>
          )}
        </footer>
      </div>
    </article>
  );
}