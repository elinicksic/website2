import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
};

export type Post = PostMeta & {
  contentHtml: string;
};

const postsDirectory = path.join(process.cwd(), "content", "posts");

export async function getAllPostSlugs(): Promise<string[]> {
  const files = await safeReaddir(postsDirectory);
  return files
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const filePath = path.join(postsDirectory, `${slug}.md`);
      const file = await fs.readFile(filePath, "utf8");
      const { data } = matter(file);
      const meta: PostMeta = {
        slug,
        title: String(data.title ?? slug),
        date: normalizeDate(String(data.date ?? Date.now())),
        summary: data.summary ? String(data.summary) : undefined,
        tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      };
      return meta;
    })
  );

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  try {
    const file = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(file);
    const processed = await remark().use(gfm).use(html).process(content);
    const contentHtml = String(processed);
    return {
      slug,
      title: String(data.title ?? slug),
      date: normalizeDate(String(data.date ?? Date.now())),
      summary: data.summary ? String(data.summary) : undefined,
      tags: Array.isArray(data.tags) ? data.tags.map(String) : undefined,
      contentHtml,
    };
  } catch {
    return null;
  }
}

async function safeReaddir(dirPath: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dirPath);
    return entries;
  } catch {
    return [];
  }
}

function normalizeDate(input: string): string {
  const dateOnlyMatch = /^\d{4}-\d{2}-\d{2}$/.test(input);
  if (dateOnlyMatch) {
    const [y, m, d] = input.split("-").map((v) => parseInt(v, 10));
    const dt = new Date(Date.UTC(y, m - 1, d, 0, 0, 0));
    return dt.toISOString();
  }
  return new Date(input).toISOString();
}


