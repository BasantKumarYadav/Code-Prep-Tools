import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },

    {
      url: `${siteConfig.url}/developer-tools`,
      lastModified: new Date(),
    },

    {
      url: `${siteConfig.url}/tools/json-formatter`,
      lastModified: new Date(),
    },

    {
      url: `${siteConfig.url}/about`,
      lastModified: new Date(),
    },

    {
      url: `${siteConfig.url}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
    },

    {
      url: `${siteConfig.url}/privacy-policy`,
      lastModified: new Date(),
    },

    {
      url: `${siteConfig.url}/terms`,
      lastModified: new Date(),
    },
  ];
}