import Image from "next/image";
import Link from "next/link";
import { Calendar } from 'lucide-react';

// Utility for formatting dates
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
    });
}

export default function FeaturedPosts({ blogs }) {
    // Make sure we have blogs before accessing them
    if (!blogs || blogs.length === 0) {
        return null;
    }

    // Get the first three blogs for the featured section
    const [first, second, third] = blogs.slice(0, 3);

    // Helper function to get cover image URL (handles both old string and new object format)
    const getCoverImageUrl = (coverImage) => {
        if (!coverImage) return '/default-blog-cover.jpg';
        return typeof coverImage === 'string' ? coverImage : coverImage.url || '/default-blog-cover.jpg';
    };

    // Helper function to get cover image alt text
    const getCoverImageAlt = (coverImage, title) => {
        if (typeof coverImage === 'object' && coverImage?.alt) {
            return coverImage.alt;
        }
        return title;
    };

    return (
      <section className="w-full relative">
    <div className="max-w-7xl mx-auto relative z-10 px-2 lg:px-8">
        {/* Header with Liquid Badge */}
        <div className="inline-block mb-4 group">
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-full px-4 py-2 shadow-lg transition-all duration-300">
                <span className="text-xs font-medium text-yellow-400 tracking-wide">FEATURED COLLECTION</span>
            </div>
        </div>
        <h2 className="text-4xl md:text-5xl !font-light text-white mb-12">Featured Posts</h2>

        <div className="grid grid-cols-12 grid-rows-2 gap-6 lg:gap-8">
            {/* --- Left Big Post --- */}
            {first && (
                <article className="col-span-12 lg:col-span-6 row-span-2 relative rounded-3xl overflow-hidden group h-[400px] lg:h-[500px] bg-zinc-900 border border-zinc-800 shadow-2xl transition-all duration-500 hover:border-zinc-700">
                    <Link href={`/blogs/${first.slug}`} prefetch={false} className="block relative w-full h-full">
                        <Image
                            src={getCoverImageUrl(first.coverImage)}
                            alt={getCoverImageAlt(first.coverImage, first.title)}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 rounded-3xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-3xl"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            <div className="inline-block bg-yellow-400 px-4 py-2 rounded-full mb-4 shadow-lg">
                                <span className="text-xs font-semibold text-neutral-900">
                                    {first.tags?.[0]?.toUpperCase() || "FEATURED"}
                                </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-light leading-snug group-hover:text-yellow-400 transition-colors duration-300">
                                {first.title}
                            </h3>
                        </div>
                    </Link>
                </article>
            )}

            {/* --- Right Top Post --- */}
            {second && (
                <article className="col-span-12 lg:col-span-6 row-span-1 p-[1px] rounded-3xl bg-zinc-800 hover:bg-zinc-700 transition-all duration-500 group">
                    <div className="bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden h-full">
                        <div className="relative p-2 sm:p-6 flex items-center gap-4 h-full">
                            <Link
                                href={`/blogs/${second.slug}`}
                                prefetch={false}
                                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 relative flex-shrink-0 rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={getCoverImageUrl(second.coverImage)}
                                    alt={getCoverImageAlt(second.coverImage, second.title)}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                />
                            </Link>
                            <div className="flex flex-col justify-center flex-1">
                                <div className="inline-block bg-zinc-800 px-2 sm:px-4 py-1 rounded-full mb-2 w-fit">
                                    <span className="uppercase text-xs font-medium text-yellow-400">
                                        {second.tags?.[0] || "INSIGHTS"}
                                    </span>
                                </div>
                                <Link href={`/blogs/${second.slug}`} prefetch={false}>
                                    <h4 className="font-medium text-md md:text-xl text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                                        {second.title}
                                    </h4>
                                </Link>
                                <div className="flex items-center space-x-2 text-zinc-400 text-sm font-light mt-2">
                                    <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                                    <time>{formatDate(second.createdAt)}</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            )}

            {/* --- Right Bottom Post --- */}
            {third && (
                <article className="col-span-12 lg:col-span-6 row-span-1 p-[1px] rounded-3xl bg-zinc-800 hover:bg-zinc-700 transition-all duration-500 group">
                    <div className="bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden h-full">
                        <div className="relative p-2 sm:p-6 flex items-center gap-4 h-full">
                            <Link
                                href={`/blogs/${third.slug}`}
                                prefetch={false}
                                className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 relative flex-shrink-0 rounded-2xl overflow-hidden"
                            >
                                <Image
                                    src={getCoverImageUrl(third.coverImage)}
                                    alt={getCoverImageAlt(third.coverImage, third.title)}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                />
                            </Link>
                            <div className="flex flex-col justify-center flex-1">
                                <div className="inline-block bg-zinc-800 px-2 sm:px-4 py-1 rounded-full mb-2 w-fit">
                                    <span className="uppercase text-xs font-medium text-yellow-400">
                                        {third.tags?.[0] || "LEARNING"}
                                    </span>
                                </div>
                                <Link href={`/blogs/${third.slug}`} prefetch={false}>
                                    <h4 className="font-medium text-md md:text-xl text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2">
                                        {third.title}
                                    </h4>
                                </Link>
                                <div className="flex items-center space-x-2 text-zinc-400 text-sm font-light mt-2">
                                    <Calendar className="h-3.5 w-3.5 text-zinc-500" />
                                    <time>{formatDate(third.createdAt)}</time>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            )}
        </div>
    </div>
</section>
    );
}
