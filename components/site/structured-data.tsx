import { site } from "@/content/site";
import { listWork } from "@/content/work";

const university = {
  "@type": "CollegeOrUniversity",
  name: "University of Waterloo",
  url: "https://uwaterloo.ca",
} as const;

function email(): string {
  return site.social.email.href.replace(/^mailto:/, "");
}

/** schema.org Person + WebSite graph so search engines and agents can read who Aidan is. */
function structuredData() {
  const personId = `${site.url}/#person`;
  const pastEmployers = listWork().flatMap((work) =>
    work.company.startsWith("Copperlane")
      ? [{ "@type": "Organization", name: work.company, url: work.url }]
      : [],
  );

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        url: site.url,
        email: email(),
        jobTitle: "Software Engineering Student",
        description: `${site.bio} Expected graduation: ${site.graduation}.`,
        affiliation: university,
        alumniOf: [university, ...pastEmployers],
        hasOccupation: {
          "@type": "Occupation",
          name: "Software Engineer",
          description:
            "Former software engineering intern at Copperlane (YC W26), San Francisco, summer 2026.",
        },
        knowsAbout: site.knowsAbout,
        seeks: {
          "@type": "Demand",
          name: "Software engineering internship",
          description: site.seeking.summary,
          availableAtOrFrom: site.seeking.locations.map((name) => ({
            "@type": "Place",
            name,
          })),
        },
        sameAs: [
          site.social.github.href,
          site.social.linkedin.href,
          site.social.x.href,
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        name: site.title,
        url: site.url,
        description: site.description,
        inLanguage: "en",
        author: { "@id": personId },
        publisher: { "@id": personId },
      },
    ],
  };
}

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c"),
      }}
    />
  );
}
