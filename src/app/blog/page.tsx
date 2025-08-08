import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Blog</h1>
      </header>

      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="group">
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-lg border border-white/5 bg-white/0 hover:bg-white/[0.03] transition-colors p-5"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-xl font-semibold group-hover:text-hover">
                  {post.title}
                </h2>
                <time className="text-sm text-foreground/60">
                  {formatDate(post.date)}
                </time>
              </div>
              {post.summary ? (
                <p className="mt-2 text-foreground/75">{post.summary}</p>
              ) : null}
              {post.tags && post.tags.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs rounded-full border border-white/10 px-2 py-1 text-foreground/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}


