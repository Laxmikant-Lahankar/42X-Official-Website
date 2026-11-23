import { jsonLd } from "@/lib/seo";

/** Renders schema.org structured data as a JSON-LD script tag. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
    />
  );
}
