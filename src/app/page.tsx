import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <section className="mb-16">
        <p className="text-foreground/70">Hello, I&apos;m</p>
        <h1 className="mt-2 text-4xl sm:text-6xl font-extrabold tracking-tight">
          Eli Nicksic
        </h1>
        <p className="mt-6 text-lg text-foreground/80 max-w-2xl">
          College student with interests in software development, robotics, and homelabbing.
        </p>
      </section>

      <section id="projects" className="mb-24">
        <h2 className="text-2xl font-bold tracking-tight">Selected work</h2>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "FRC Robotics",
              desc: "Led software development for Team 624, CRyptonite.",
              href: "https://github.com/team624",
            },
            {
              title: "This website",
              desc: "Simple personal website and blog built with Next.js",
              href: "https://github.com/elinicksic/website2",
            }
          ].map((p) => (
            <a
              key={p.title}
              href={p.href}
              className="group rounded-xl border border-white/5 bg-white/0 hover:bg-white/[0.03] transition-colors p-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold group-hover:text-hover">
                  {p.title}
                </h3>
                <span className="text-foreground/40">→</span>
              </div>
              <p className="mt-2 text-foreground/75">{p.desc}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
