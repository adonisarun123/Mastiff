import { Metadata } from 'next';
import { companyInfo as facts } from './company-info';

const SITE_URL = "https://www.whitemassif.com";

/** Absolute URL for a site path, with spaces and special characters encoded. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${encodeURI(path.startsWith('/') ? path : `/${path}`)}`;
}

// Company information for structured data. Facts (founding year, founders, stats,
// phone, social profiles) come from company-info.ts so the schema can never disagree
// with what the pages say.
export const companyInfo = {
  name: "White Massif Event Management",
  legalName: "White Massif Event Management Private Limited",
  url: SITE_URL,
  // Absolute, no spaces: Google requires an absolute logo URL for the knowledge panel.
  logo: `${SITE_URL}/brand/wm-logo.png`,
  ogImage: `${SITE_URL}/brand/wm-og.jpg`,
  description: `Corporate event management company in Bangalore, founded in ${facts.foundingYear}, with ${facts.stats.events} events delivered for ${facts.stats.clients} corporate clients: conferences, product launches, annual days, awards, MICE, employee engagement and hybrid events across India.`,
  foundingDate: String(facts.foundingYear),
  founders: facts.founders,
  email: facts.email,
  telephone: facts.phoneE164,
  // City-level address only. The street address will be added once confirmed; the old
  // "HSR Layout // Update with actual address" placeholder and HSR coordinates did not
  // match the Google Business Profile embedded in the footer.
  address: {
    addressLocality: "Bangalore",
    addressRegion: "Karnataka",
    addressCountry: "IN"
  },
  // Google Business Profile (the same place embedded in the footer map).
  hasMap: facts.googleMapsUrl,
  openingHours: "Mo-Sa 09:00-19:00",
  priceRange: "₹₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Credit Card, UPI, Bank Transfer",
  areaServed: [
    "Bangalore", "Mumbai", "Delhi", "Chennai", "Hyderabad", "Pune",
    "Kolkata", "Ahmedabad", "Gurgaon", "Noida", "India", "Karnataka"
  ],
  socialProfiles: [
    facts.social.linkedin,
    facts.social.instagram,
    facts.social.facebook,
    facts.social.youtube,
  ],
  serviceTypes: [
    "Corporate Events",
    "Product Launches",
    "Annual Day Celebrations",
    "Team Building Activities",
    "Conference Management",
    "Award Ceremonies",
    "Brand Activation",
    "Employee Engagement Programs",
    "Virtual Events",
    "Hybrid Events"
  ],
  keywords: {
    primary: [
      "corporate event management company in Bangalore",
      "event management companies in India",
      "corporate event planners Bangalore",
      "best event management company Karnataka",
      "corporate event organizers India"
    ],
    secondary: [
      "team building activities Bangalore",
      "product launch event management",
      "annual day celebration organizers",
      "conference management services India",
      "employee engagement event planners",
      "virtual event management India",
      "hybrid event solutions Bangalore"
    ]
  }
};

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

// Organization + local business in one entity (ProfessionalService is both). One @id
// that every other schema on the site references.
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORGANIZATION_ID,
    name: companyInfo.name,
    alternateName: facts.brandName,
    legalName: companyInfo.legalName,
    url: companyInfo.url,
    logo: {
      "@type": "ImageObject",
      url: companyInfo.logo,
      width: 480,
      height: 399
    },
    image: companyInfo.ogImage,
    description: companyInfo.description,
    foundingDate: companyInfo.foundingDate,
    founder: companyInfo.founders.map(founder => ({
      "@type": "Person",
      name: founder
    })),
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: parseInt(facts.stats.team, 10)
    },
    email: companyInfo.email,
    telephone: companyInfo.telephone,
    address: {
      "@type": "PostalAddress",
      ...companyInfo.address
    },
    hasMap: companyInfo.hasMap,
    priceRange: companyInfo.priceRange,
    currenciesAccepted: companyInfo.currenciesAccepted,
    paymentAccepted: companyInfo.paymentAccepted,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00"
      }
    ],
    areaServed: companyInfo.areaServed.map(area => ({
      "@type": area === "India" ? "Country" : area === "Karnataka" ? "State" : "City",
      name: area
    })),
    knowsAbout: companyInfo.serviceTypes,
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: companyInfo.telephone,
        email: companyInfo.email,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Kannada"]
      }
    ],
    sameAs: companyInfo.socialProfiles,
    // No aggregateRating: Google only allows review markup backed by real, visible
    // reviews. The old hard-coded 4.9 / 175 had neither and risked a manual action.
  };
}

/**
 * @deprecated Merged into generateOrganizationSchema (typed Organization +
 * ProfessionalService). The old "EventVenue" type was wrong: White Massif is not a venue.
 */
export function generateLocalBusinessSchema() {
  return null;
}

// Service Schema for Event Management Services
export function generateServiceSchema(service: {
  name: string;
  description: string;
  image?: string;
  provider?: string;
  serviceType?: string;
  areaServed?: string[];
  hasOfferCatalog?: any;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    image: service.image ? absoluteUrl(service.image) : companyInfo.ogImage,
    provider: service.provider
      ? { "@type": "Organization", name: service.provider }
      : { "@id": ORGANIZATION_ID },
    serviceType: service.serviceType || "Event Management",
    areaServed: service.areaServed || companyInfo.areaServed,
    hasOfferCatalog: service.hasOfferCatalog || {
      "@type": "OfferCatalog",
      name: `${service.name} Services`,
      itemListElement: companyInfo.serviceTypes.map((type, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: type
        },
        position: index + 1
      }))
    }
  };
}

// BlogPosting schema. URLs are absolute, the publisher is the site Organization, and
// dateModified uses the CMS update time instead of always repeating the publish date.
export function generateArticleSchema(article: {
  title: string;
  description: string;
  content: string;
  author?: string;
  publishDate: string;
  modifiedDate?: string;
  image?: string;
  url: string;
  keywords?: string[];
}) {
  const plainText = article.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const author = article.author && !/white massif/i.test(article.author)
    ? { "@type": "Person", name: article.author }
    : { "@id": ORGANIZATION_ID };
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    articleBody: plainText.substring(0, 1000),
    wordCount: plainText ? plainText.split(' ').length : undefined,
    author,
    publisher: { "@id": ORGANIZATION_ID },
    datePublished: article.publishDate,
    dateModified: article.modifiedDate || article.publishDate,
    image: article.image ? absoluteUrl(article.image) : companyInfo.ogImage,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(article.url)
    },
    keywords: article.keywords?.join(", ") || undefined,
    inLanguage: "en-IN"
  };
}

// Event Schema for Portfolio Items
export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  image?: string;
  organizer?: string;
  eventType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: event.location ? {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN"
      }
    } : undefined,
    image: event.image ? absoluteUrl(event.image) : companyInfo.ogImage,
    organizer: {
      "@type": "Organization",
      name: event.organizer || companyInfo.name,
      url: companyInfo.url
    },
    performer: {
      "@type": "Organization",
      name: companyInfo.name
    }
  };
}

// BreadcrumbList Schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${companyInfo.url}${item.url}`
    }))
  };
}

// FAQ Schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

// Person Schema for Team Members
export function generatePersonSchema(person: {
  name: string;
  jobTitle: string;
  description?: string;
  image?: string;
  email?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.description,
    image: person.image,
    email: person.email,
    worksFor: {
      "@type": "Organization",
      name: companyInfo.name,
      url: companyInfo.url
    }
  };
}

// JobPosting Schema for Careers
export function generateJobPostingSchema(job: {
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  employmentType?: string;
  salary?: {
    currency: string;
    minValue?: number;
    maxValue?: number;
  };
  location?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    employmentType: job.employmentType || "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: companyInfo.name,
      sameAs: companyInfo.url,
      logo: companyInfo.logo
    },
    directApply: false,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location || "Bangalore",
        addressRegion: "Karnataka",
        addressCountry: "IN"
      }
    },
    baseSalary: job.salary ? {
      "@type": "MonetaryAmount",
      currency: job.salary.currency || "INR",
      value: job.salary.maxValue ? {
        "@type": "QuantitativeValue",
        minValue: job.salary.minValue,
        maxValue: job.salary.maxValue,
        unitText: "YEAR"
      } : job.salary.minValue
    } : undefined
  };
}

// WebSite schema. No SearchAction: the site has no /search page (it returned 404),
// and inLanguage only lists the language the content is actually in.
export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${companyInfo.url}/#website`,
    url: companyInfo.url,
    name: companyInfo.name,
    alternateName: facts.brandName,
    description: companyInfo.description,
    publisher: {
      "@id": ORGANIZATION_ID
    },
    inLanguage: "en-IN"
  };
}

// Generate comprehensive metadata for pages
export function generatePageMetadata({
  title,
  description,
  keywords,
  openGraph,
  path = "",
  images = [],
  noindex = false,
  alternates = {}
}: {
  title: string;
  description: string;
  keywords?: string[];
  openGraph?: any;
  path?: string;
  images?: string[];
  noindex?: boolean;
  alternates?: any;
}): Metadata {
  const fullUrl = `${companyInfo.url}${path}`;
  const shareImages = (images.length > 0 ? images : [companyInfo.ogImage]).map(absoluteUrl);

  return {
    title: `${title}`,
    description,
    keywords: keywords?.join(", ") || companyInfo.keywords.primary.join(", "),
    authors: [{ name: companyInfo.name }],
    creator: companyInfo.name,
    publisher: companyInfo.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(companyInfo.url),
    // Single-language site: a canonical is enough. The old en-IN + en hreflang pair
    // pointed at the same URL with no x-default, which only adds noise.
    alternates: {
      canonical: fullUrl,
      ...alternates
    },
    openGraph: {
      title: `${title}`,
      description,
      url: fullUrl,
      siteName: companyInfo.name,
      locale: 'en_IN',
      ...openGraph,
      type: openGraph?.type || 'website',
      images: openGraph?.images ? [].concat(openGraph.images).map((img: string) => absoluteUrl(img)) : shareImages
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title}`,
      description,
      images: shareImages,
      creator: '@whitemassif'
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'pHX0F5J-O1NzC0IdjnmN3RgKaspBaSc2c5N4Zr8T5co',
    }
  };
}

// Helper to inject schema into page
export function renderSchema(schema: any | any[]): string {
  const schemas = Array.isArray(schema) ? schema : [schema];
  return schemas.map(s =>
    `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(${JSON.stringify(s)}) }} />`
  ).join('\n');
}

// India-specific SEO optimizations
export const indianSEOKeywords = {
  cities: [
    "Bangalore", "Bengaluru", "Mumbai", "Delhi", "Chennai", "Hyderabad",
    "Pune", "Kolkata", "Ahmedabad", "Gurgaon", "Noida", "Kochi",
    "Jaipur", "Lucknow", "Chandigarh", "Indore", "Nagpur", "Surat"
  ],
  regions: [
    "Karnataka", "Maharashtra", "Tamil Nadu", "Telangana", "NCR",
    "Delhi NCR", "Gujarat", "Rajasthan", "Kerala", "Andhra Pradesh"
  ],
  eventTypes: [
    "corporate events", "product launches", "annual day",
    "team building", "conferences", "seminars", "workshops",
    "award ceremonies", "dealer meets", "employee engagement",
    "brand activation", "roadshows", "trade shows"
  ],
  industries: [
    "IT companies", "software companies", "MNCs", "startups",
    "pharmaceutical", "manufacturing", "banking", "finance",
    "healthcare", "education", "retail", "ecommerce"
  ]
};

// Generate location-specific content
export function generateLocationContent(city: string, region?: string) {
  return {
    title: `Event Management Company in ${city}${region ? `, ${region}` : ''}`,
    h1: `Leading Corporate Event Management Services in ${city}`,
    description: `White Massif - Your trusted corporate event management partner in ${city}. Specializing in corporate events, product launches, team building activities, and conferences. Serving ${region || city} since ${facts.foundingYear}, with ${facts.stats.events} events delivered for ${facts.stats.clients} corporate clients.`,
    keywords: [
      `event management company in ${city}`,
      `corporate event planners ${city}`,
      `event organizers in ${city}`,
      `${city} event management services`,
      `best event company in ${region || city}`,
      `corporate events ${city}`,
      `team building activities ${city}`,
      `product launch events ${city}`
    ]
  };
}

// Generate FAQ content for common queries
export const commonFAQs = [
  {
    question: "What types of corporate events does White Massif manage in India?",
    answer: "White Massif specializes in managing various corporate events across India including product launches, annual day celebrations, team building activities, conferences, seminars, award ceremonies, dealer meets, employee engagement programs, and virtual/hybrid events."
  },
  {
    question: "Which cities in India does White Massif provide event management services?",
    answer: "We provide comprehensive event management services across major Indian cities including Bangalore, Mumbai, Delhi NCR, Chennai, Hyderabad, Pune, Kolkata, Ahmedabad, and other tier-1 and tier-2 cities across India."
  },
  {
    question: "How much does corporate event management cost in Bangalore?",
    answer: "Event management costs vary based on the scale, type, and requirements of your event. We offer customized packages starting from ₹50,000 for small corporate events to premium solutions for large-scale conferences and product launches. Contact us for a detailed quote."
  },
  {
    question: "What makes White Massif the best event management company in Karnataka?",
    answer: `Since ${facts.foundingYear}, White Massif has delivered ${facts.stats.events} events for ${facts.stats.clients} corporate clients, including Fortune 500 companies. A ${facts.stats.team}-person in-house team handles strategy, creative, production and on-ground execution end to end.`
  },
  {
    question: "Does White Massif handle virtual and hybrid events?",
    answer: "Yes, we specialize in virtual and hybrid event management with cutting-edge technology, professional streaming services, and engaging digital experiences that connect audiences across India and globally."
  }
];