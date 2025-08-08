import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const postSlugs = await getAllPostSlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/blog",
  ].map((route) => ({
    url: new URL(route, baseUrl).toString(),
    lastModified: new Date(),
  }));

  const blogRoutes: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: new URL(`/blog/${slug}`, baseUrl).toString(),
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...blogRoutes];
}


