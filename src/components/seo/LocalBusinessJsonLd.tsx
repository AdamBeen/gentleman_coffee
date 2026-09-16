import { siteConfig } from "@/config/site";
import { getSiteUrl } from "@/config/site";

/**
 * JSON-LD LocalBusiness — toutes les valeurs proviennent de
 * src/config/site.ts. Les champs non renseignés sont omis
 * (aucune donnée inventée).
 */
export function LocalBusinessJsonLd() {
  const url = getSiteUrl();

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.businessName,
    url: url,
    description:
      "Distributeurs automatiques de café, boissons et snacking pour entreprises, commerces et établissements à Bordeaux et en Gironde.",
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city || undefined,
      postalCode: siteConfig.postalCode || undefined,
      streetAddress: siteConfig.address || undefined,
      addressCountry: "FR",
    },
  };

  if (siteConfig.legalName) data.legalName = siteConfig.legalName;
  if (siteConfig.phone) data.telephone = siteConfig.phone;
  if (siteConfig.email) data.email = siteConfig.email;
  if (siteConfig.latitude !== null && siteConfig.longitude !== null) {
    data.geo = {
      "@type": "GeoCoordinates",
      latitude: siteConfig.latitude,
      longitude: siteConfig.longitude,
    };
  }
  if (siteConfig.openingHours.length > 0) {
    data.openingHoursSpecification = siteConfig.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.hours.split(" – ")[0] || undefined,
      closes: h.hours.split(" – ")[1] || undefined,
    }));
  }
  if (siteConfig.serviceAreas.length > 0) {
    data.areaServed = siteConfig.serviceAreas.map((area) => ({
      "@type": "City",
      name: area,
    }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
