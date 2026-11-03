import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import dynamic from "next/dynamic";
import GoogleReviews from "@/components/google-reviews";

// Dynamic import for code splitting - reduces initial bundle
const HomeClient = dynamic(() => import("./home-client"), {
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-amber-50/30 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#F9A625] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#2A3959] text-lg font-medium">Loading Experience...</p>
      </div>
    </div>
  ),
  ssr: true, // Enable SSR for SEO
});

export const metadata: Metadata = generatePageMetadata({
  title: "Corporate Event Management Company in Bangalore | White Massif",
  description: "White Massif plans and runs corporate events in Bangalore and across India since 2013: conferences, product launches, annual days, awards and hybrid events.",
  keywords: [
    "corporate event management company India",
    "event management companies Bangalore",
    "corporate event planners India",
    "best event management company Karnataka",
    "business event organizers Bangalore",
    "product launch events India",
    "annual day celebration organizers",
    "team building activities Bangalore",
    "conference management services India",
    "White Massif events",
    "corporate event management company Bangalore"
  ],
  openGraph: {
    type: "website"
  },
  path: "/"
});

// Rebuilt once a day so the Google rating and reviews stay current (they are cached for the
// same period, see google-reviews.ts). Regenerated copies render with the pathname "/index";
// navigation.tsx treats that as "/" so the homepage header styling still applies.
export const revalidate = 86400;

export default function HomePage() {
  return <HomeClient reviews={<GoogleReviews />} />;
}