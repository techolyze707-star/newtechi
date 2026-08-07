import { getCoverImageData } from "@/lib/blog-utils";
import Image from "next/image";
import Link from "next/link";

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function calculateReadTime(text = '', wpm = 200) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wpm);
  return `${minutes} min read`;
}


function CategoryBadge({ category }) {
  return (
    <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-full text-yellow-400 w-auto">
      {category}
    </span>

  );
}


function getRandomViews(min = 10, max = 1000) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const Eye = () => {
  return (<svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-4 h-4 text-neutral-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.478 0-8.268-2.943-9.542-7z"
    />
  </svg>)
}



export function FeaturedCard({
  slug,
  type,
  image,
  title,
  description,
  isVideo,
  author = "Anonymous",
  category = "AI",
  date = new Date().toISOString(),
  readTimeText,
}) {
  const readTime = readTimeText || calculateReadTime(description);
  const coverImageData = getCoverImageData(image);

  return (
    <article
      className="group relative grid grid-cols-1 md:grid-cols-2 w-full h-[500px] rounded-xl overflow-hidden transition-all duration-500"
      aria-labelledby={`featured-title-${slug}`}
    >
      {/* Left Image Side with Gradient Overlay */}
      <figure className="hidden md:block relative h-full overflow-hidden bg-neutral-800">
        <Image
         src={coverImageData.url}
          alt={coverImageData.alt || title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
          sizes="50vw"
          priority
        />
        {isVideo && (
          <>
            <div className="absolute top-6 left-6 z-20 bg-yellow-400 text-black text-xs font-bold rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
              <span className="text-lg">▶</span> Video
            </div>
            <figcaption className="sr-only">This post includes a video</figcaption>
          </>
        )}
      </figure>

      {/* Right Content Area with Glassmorphism */}
      <div className="relative flex items-center p-8 md:p-12 bg-neutral-900/95 backdrop-blur-sm text-white">
        {/* Decorative gradient accent */}
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600"></div>

        <div className="max-w-lg relative z-10">
          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md hover:shadow-lg transition-shadow"
              aria-label={`Category: ${category}`}
            >
              {category}
            </span>
          </div>

          {/* Title (linked) */}
          <h2
            id={`featured-title-${slug}`}
            className="text-3xl md:text-5xl font-bold mb-4 line-clamp-5 leading-tight text-white drop-shadow-md" >
            <Link
              href={`/blogs/${slug}`}
              prefetch={false}
              className="hover:opacity-80 transition-opacity duration-300 animate-pulse-once"
            >
              {title}
            </Link>
          </h2>

          {/* Description */}
          <p className="hidden md:block text-neutral-400 text-sm md:text-base line-clamp-3 mb-6 leading-relaxed">
            {description}
          </p>

          {/* Meta Info with Icons */}
          <footer className="flex items-center text-sm text-neutral-450 gap-3 mb-6 flex-wrap">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-neutral-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-semibold uppercase text-xs">
                {author}
              </span>
            </span>
            <span aria-hidden="true" className="text-neutral-500">•</span>
            <time dateTime={date} className="flex items-center gap-1.5 text-neutral-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {formatDate(date)}
            </time>
            <span aria-hidden="true" className="text-neutral-500">•</span>
            <span className="flex items-center gap-1.5 text-neutral-450">
              <svg className="w-4 h-4 text-neutral-450" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              {readTime}
            </span>
          </footer>

          {/* CTA Button */}
          <Link
            href={`/blogs/${slug}`}
            prefetch={false}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black text-sm font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            aria-label={`Read more about ${title}`}
          >
            Read Full Article
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );

}

