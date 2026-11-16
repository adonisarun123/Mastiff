import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo-utils";
import CareersClient from "./careers-client";
import { DirectusService } from "@/lib/directus-service";
import SchemaMarkup from "@/components/schema-markup";
import { generateJobPostingSchema } from "@/lib/seo-utils";

// Fetched on the server so openings are in the HTML; refreshed hourly from the CMS.
export const revalidate = 3600;

export const metadata: Metadata = generatePageMetadata({
  title: "Careers at White Massif | Event Management Jobs in Bangalore",
  description: "Join White Massif and build a rewarding career in corporate event management. Explore opportunities to work with impactful brands and top brands.",
  keywords: [
    "White Massif careers",
    "event management jobs Bangalore",
    "corporate event careers",
    "event planning jobs India",
    "White Massif job openings",
    "event management opportunities",
    "career in events Bangalore",
    "event industry jobs",
    "corporate event job opportunities",
    "White Massif employment"
  ],
  openGraph: {
    type: "website"
  },
  path: "/careers"
});

export default async function CareersPage() {
  const jobs = await DirectusService.getJobs();
  // JobPosting markup (Google for Jobs) for each published CMS opening. With none,
  // the page shows a "no open roles" message and emits no job markup.
  const jobSchemas = jobs.map((job) =>
    generateJobPostingSchema({
      title: job.title,
      description: [job.description, ...(job.requirements || [])].filter(Boolean).join("\n"),
      datePosted: (job.date_updated || job.date_created || new Date().toISOString()).slice(0, 10),
      employmentType: /part/i.test(job.type) ? "PART_TIME" : /intern/i.test(job.type) ? "INTERN" : /contract|freelance/i.test(job.type) ? "CONTRACTOR" : "FULL_TIME",
      location: job.location?.split(",")[0]?.trim() || "Bangalore",
    })
  );
  return (
    <>
      {jobSchemas.length > 0 && <SchemaMarkup schema={jobSchemas} />}
      <CareersClient jobs={jobs} />
    </>
  );
}
