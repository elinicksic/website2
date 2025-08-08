import { NextResponse } from "next/server";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const posts = await getAllPosts();
  const fullPosts = await Promise.all(posts.map((p) => getPostBySlug(p.slug)));

  const items = fullPosts
    .filter(Boolean)
    .map((p) => {
      const post = p!;
      const link = `${baseUrl}/blog/${post.slug}`;
      return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${link}</link>
        <guid>${link}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.summary ?? ""}]]></description>
      </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Eli Nicksic — Blog</title>
      <link>${baseUrl}/blog</link>
      <description>Personal posts and notes</description>
      ${items}
    </channel>
  </rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}


