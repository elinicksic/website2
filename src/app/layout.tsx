import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eli Nicksic",
  description: "Personal portfolio of Eli Nicksic",
};

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="hover:text-hover px-3 py-2 rounded-md text-sm font-medium transition-colors"
    >
      {children}
    </Link>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-black/30 bg-black/20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex-shrink-0">
                <h1 className="text-xl font-bold tracking-tight">Eli Nicksic</h1>
              </Link>
              <div className="block">
                <div className="ml-10 flex items-baseline space-x-2">
                  <NavItem href="/">Home</NavItem>
                  <NavItem href="/blog">Blog</NavItem>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="fixed bottom-4 right-4 z-50 flex gap-3 text-foreground/80">
          <a
            href="https://github.com/elinicksic"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-hover transition-colors"
            title="GitHub"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1.01.07 1.54 1.06 1.54 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.37-2.22-.26-4.56-1.13-4.56-5 0-1.1.38-1.99 1.02-2.69-.1-.26-.44-1.3.1-2.7 0 0 .84-.27 2.75 1.03.8-.23 1.65-.35 2.5-.35.85 0 1.7.12 2.5.35 1.9-1.3 2.74-1.03 2.74-1.03.55 1.4.21 2.44.1 2.7.64.7 1.02 1.59 1.02 2.69 0 3.88-2.34 4.73-4.57 4.98.36.32.68.95.68 1.92 0 1.38-.01 2.49-.01 2.83 0 .27.18.6.69.49A10.05 10.05 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/eli-nicksic-89b992224/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-hover transition-colors"
            title="LinkedIn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5.001 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM14.5 9A4.5 4.5 0 0 0 10 13.5V21h4v-7a2 2 0 1 1 4 0v7h4v-7.5A4.5 4.5 0 0 0 17.5 9z"/>
            </svg>
          </a>
          <a
            href="mailto:me@elinicksic.me"
            aria-label="Email"
            className="hover:text-hover transition-colors"
            title="Email"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5zm2.5-.5a.5.5 0 0 0-.5.5v.3l8 5.2 8-5.2v-.3a.5.5 0 0 0-.5-.5zM20 9.9l-7.53 4.9a1 1 0 0 1-1.06 0L4 9.9V17a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5z"/>
            </svg>
          </a>
        </div>
        {children}
      </body>
    </html>
  );
}
