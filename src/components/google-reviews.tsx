import { ArrowRight, PenLine, Star } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { companyInfo } from '@/lib/company-info';
import { getGoogleReviews, type GoogleReview } from '@/lib/google-reviews';
import { cn } from '@/lib/utils';

/*
 * Google rating and reviews. A server component: the data is fetched and cached on the
 * server (see google-reviews.ts), so it adds no request or JavaScript to the page.
 *
 * Google's display rules for Places reviews, all met below: credit each author (name,
 * photo, profile link), link every review to Google Maps, say how reviews are chosen,
 * flag translations, and show the "Google Maps" attribution inside the section.
 * https://developers.google.com/maps/documentation/places/web-service/policies
 */

const STAR_KEYS = [0, 1, 2, 3, 4];

/** Five stars, filled up to `rating`; a fractional rating partly fills the last star. */
function Stars({ rating, className }: { rating: number; className: string }) {
  const filled = `${(Math.min(Math.max(rating, 0), 5) / 5) * 100}%`;
  return (
    <span className="relative inline-flex" role="img" aria-label={`${rating} out of 5 stars`}>
      <span className="flex text-gray-300">
        {STAR_KEYS.map(key => <Star key={key} className={cn(className, 'fill-current')} />)}
      </span>
      <span className="absolute inset-y-0 left-0 flex overflow-hidden text-[#F9A625]" style={{ width: filled }}>
        {STAR_KEYS.map(key => <Star key={key} className={cn(className, 'fill-current flex-shrink-0')} />)}
      </span>
    </span>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  const author = review.authorUrl ? (
    <a
      href={review.authorUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block truncate font-semibold text-[#2A3959] hover:text-[#F9A625] transition-colors"
    >
      {review.authorName}
    </a>
  ) : (
    <p className="truncate font-semibold text-[#2A3959]">{review.authorName}</p>
  );

  return (
    <article className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <header className="flex items-center gap-3 mb-4">
        {review.authorPhotoUrl ? (
          // Loaded straight from Google: its terms do not allow caching it through /_next/image.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.authorPhotoUrl}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <span
            aria-hidden="true"
            className="w-10 h-10 rounded-full bg-[#2A3959] text-white flex items-center justify-center font-semibold flex-shrink-0"
          >
            {review.authorName.charAt(0)}
          </span>
        )}
        <div className="min-w-0">
          {author}
          <p className="text-sm text-gray-500">{review.relativeTime}</p>
        </div>
      </header>

      <Stars rating={review.rating} className="w-4 h-4" />

      <p className="mt-3 flex-1 text-gray-600 leading-relaxed text-sm lg:text-base line-clamp-6">
        {review.text}
      </p>
      {review.translated && <p className="mt-2 text-xs text-gray-500">Translated by Google</p>}

      {review.reviewUrl && (
        <a
          href={review.reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center text-sm font-semibold text-[#2A3959] hover:text-[#F9A625] transition-colors"
        >
          Read on Google
          <ArrowRight className="ml-1 w-4 h-4" />
        </a>
      )}
    </article>
  );
}

export default async function GoogleReviews() {
  const data = await getGoogleReviews();
  if (!data) return null;

  return (
    <section
      aria-labelledby="google-reviews-heading"
      className="py-16 lg:py-20 bg-gradient-to-br from-neutral-50 via-white to-amber-50/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-12 lg:mb-16">
          <h2
            id="google-reviews-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-display mb-6 text-[#2A3959] leading-tight"
          >
            Rated <span className="text-[#F9A625]">{data.rating.toFixed(1)}</span> on Google
          </h2>
          <div className="flex flex-col items-center gap-2 mb-8">
            <Stars rating={data.rating} className="w-7 h-7" />
            <p className="text-lg sm:text-xl text-gray-600 font-body">
              Based on {data.ratingCount} Google {data.ratingCount === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={companyInfo.googleWriteReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-[#F9A625] hover:bg-[#F9A625]/90 text-black font-heading px-8 py-4 rounded-full text-lg'
              )}
            >
              <PenLine className="h-5 w-5" />
              Write a review
            </a>
            <a
              href={data.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: 'outline', size: 'lg' }),
                'border-[#2A3959] text-[#2A3959] hover:bg-[#2A3959] hover:text-white px-8 py-4 rounded-full text-lg'
              )}
            >
              See all reviews on Google
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        {data.reviews.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6">
            {data.reviews.map(review => <ReviewCard key={review.id} review={review} />)}
          </div>
        )}

        <div className="mt-10 text-center space-y-2">
          <p className="text-sm text-gray-500">
            Showing the reviews Google ranks most relevant. Reviews without a written comment are not shown.
          </p>
          <p
            translate="no"
            className="text-sm font-normal text-[#5E5E5E]"
            style={{ fontFamily: 'Roboto, Arial, sans-serif' }}
          >
            Google Maps
          </p>
        </div>
      </div>
    </section>
  );
}
