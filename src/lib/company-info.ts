/**
 * Single source of truth for company facts shown on the site and in structured data.
 *
 * Pages used to hard-code their own numbers and they contradicted each other
 * (175+ vs 1000+ events, 20+ vs 35+ team, 2013 vs 2015). Change a fact here and it
 * changes everywhere. Client-safe: no secrets.
 */

export const FOUNDING_YEAR = 2013;

/** Whole years in business, e.g. "12+" in 2026. Computed at build/render time. */
export function yearsInBusiness(now: Date = new Date()): number {
  return now.getFullYear() - FOUNDING_YEAR - 1;
}

export const companyInfo = {
  brandName: 'White Massif',
  foundingYear: FOUNDING_YEAR,
  // Names exactly as on the About page.
  founders: ['Prakash A Vaswani', 'Vinay Kukreja', 'Hasan Peer H C', 'Naveen Abraham A'],

  stats: {
    events: '1000+',
    clients: '175+',
    team: '35+',
  },

  phoneDisplay: '+91 74112 72227',
  phoneE164: '+917411272227',
  whatsappUrl: 'https://wa.me/917411272227?text=Hello%20White%20Massif!%20I%20would%20like%20to%20inquire%20about%20your%20event%20management%20services.',
  email: 'info@whitemassif.com',
  careersEmail: 'work@whitemassif.com',

  // Street address intentionally omitted until confirmed; only city-level data is published.
  city: 'Bangalore',
  region: 'Karnataka',
  country: 'IN',

  // Matches the contact page.
  openingHoursText: 'Mon - Sat: 9:00 AM - 7:00 PM',

  // Google Business Profile: the same listing as the footer map. The place ID drives the
  // homepage reviews (google-reviews.ts) and the "Write a review" link; Google allows
  // storing place IDs indefinitely.
  googlePlaceId: 'ChIJqQTniBYXrjsRE9VB_KrqO4k',
  googleMapsUrl: 'https://www.google.com/maps?cid=9888755426919568659',
  googleWriteReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJqQTniBYXrjsRE9VB_KrqO4k',

  social: {
    linkedin: 'https://in.linkedin.com/company/white-massif-event-management-co',
    instagram: 'https://www.instagram.com/whitemassif/',
    facebook: 'https://www.facebook.com/whitemassif',
    youtube: 'https://www.youtube.com/@whitemassif',
  },
} as const;

export const yearsLabel = `${yearsInBusiness()}+`;
