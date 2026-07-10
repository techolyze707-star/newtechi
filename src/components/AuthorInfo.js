import Link from 'next/link';
import { CalendarIcon } from '@/components/ChevronRight';
import { formatDate } from '@/lib/utils';

export default function AuthorInfo({ author, publishedDate }) {
  if (!author) return null;

  return (
    <div className="bg-zinc-900 rounded-lg p-6 my-8">
      <div className="flex items-start space-x-4">
        {/* Author Avatar */}
        <Link href={`/authors/${author.slug}`} prefetch={false} className="flex-shrink-0">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover hover:ring-2 hover:ring-yellow-400 transition-all cursor-pointer"
          />
        </Link>

        {/* Author Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <Link href={`/authors/${author.slug}`} prefetch={false}>
                <h4 className="text-lg font-semibold text-white hover:text-yellow-400 transition-colors cursor-pointer">
                  {author.name}
                </h4>
              </Link>
              <p className="text-zinc-400 text-sm mb-3 leading-relaxed line-clamp-2">{author.bio}</p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex items-center space-x-4 text-sm text-zinc-400 mb-3">
            <div className="flex items-center space-x-1">
              <CalendarIcon size={16} />
              <span>Published {formatDate(publishedDate)}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}