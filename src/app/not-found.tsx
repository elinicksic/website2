import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-xl mx-auto px-4 py-24 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4 text-foreground/70">
        Why are you here?
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="rounded-md bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition-colors"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}


