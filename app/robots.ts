import type { MetadataRoute } from "next";

// Es una propuesta: que no la indexen
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
