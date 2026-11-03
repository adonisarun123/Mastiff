import 'server-only';

import { companyInfo } from './company-info';

/**
 * Google rating and reviews for the White Massif Business Profile, from the Places API (New).
 *
 * The request is made on the server and kept in the Next.js data cache for a day, so visitors
 * never wait on Google and the API is called about once a day. That stays well inside Google's
 * free monthly allowance for Place Details (1,000 requests for the reviews tier).
 *
 * Google returns at most 5 reviews, ranked by relevance; there is no way to request more or
 * to change the order.
 *
 * GOOGLE_PLACES_API_KEY is server-only: never prefix it with NEXT_PUBLIC_. When it is unset
 * this returns null and the reviews section is not rendered.
 */

const REVALIDATE_SECONDS = 86400;
const TIMEOUT_MS = 8000;
const FIELD_MASK = 'rating,userRatingCount,reviews,googleMapsLinks';

export interface GoogleReview {
  id: string;
  authorName: string;
  authorUrl?: string;
  authorPhotoUrl?: string;
  rating: number;
  text: string;
  /** True when Google translated the review into English. */
  translated: boolean;
  /** e.g. "2 months ago", as worded by Google. */
  relativeTime: string;
  /** The review on Google Maps. */
  reviewUrl?: string;
}

export interface GoogleReviewsData {
  rating: number;
  ratingCount: number;
  /** Google Maps page listing all reviews. */
  reviewsUrl: string;
  reviews: GoogleReview[];
}

interface LocalizedText {
  text?: string;
  languageCode?: string;
}

interface PlacesReview {
  name?: string;
  relativePublishTimeDescription?: string;
  text?: LocalizedText;
  originalText?: LocalizedText;
  rating?: number;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  googleMapsUri?: string;
}

interface PlaceDetailsResponse {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesReview[];
  googleMapsLinks?: { reviewsUri?: string };
}

const isBuildPhase = () => process.env.NEXT_PHASE === 'phase-production-build';

function toReview(review: PlacesReview): GoogleReview | null {
  const text = review.text?.text?.trim();
  const authorName = review.authorAttribution?.displayName;
  // Rating-only reviews have no text; they are left out (the section says so).
  if (!text || !authorName || !review.rating) return null;

  return {
    id: review.name || `${authorName}-${review.relativePublishTimeDescription}`,
    authorName,
    authorUrl: review.authorAttribution?.uri,
    authorPhotoUrl: review.authorAttribution?.photoUri,
    rating: review.rating,
    text,
    translated: Boolean(
      review.originalText?.languageCode && review.originalText.languageCode !== review.text?.languageCode
    ),
    relativeTime: review.relativePublishTimeDescription || '',
    reviewUrl: review.googleMapsUri,
  };
}

/**
 * Rating, review count and up to 5 written reviews, or null when the API key is not set.
 *
 * On failure it follows directusItems: during `next build` it returns null so a Google outage
 * cannot block a deploy; at runtime it throws, so ISR keeps serving the last good homepage
 * instead of dropping the reviews for a day.
 */
export async function getGoogleReviews(): Promise<GoogleReviewsData | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${companyInfo.googlePlaceId}?languageCode=en`,
      {
        headers: {
          'X-Goog-Api-Key': apiKey,
          'X-Goog-FieldMask': FIELD_MASK,
        },
        next: { revalidate: REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(TIMEOUT_MS),
      }
    );

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      throw new Error(`Places API ${response.status} ${detail.slice(0, 300)}`);
    }

    const place = (await response.json()) as PlaceDetailsResponse;
    if (!place.rating || !place.userRatingCount) return null;

    return {
      rating: place.rating,
      ratingCount: place.userRatingCount,
      reviewsUrl: place.googleMapsLinks?.reviewsUri || companyInfo.googleMapsUrl,
      reviews: (place.reviews ?? []).map(toReview).filter((review): review is GoogleReview => review !== null),
    };
  } catch (error) {
    console.error('[google-reviews] Failed to load reviews:', error instanceof Error ? error.message : error);
    if (isBuildPhase()) return null;
    throw error;
  }
}
