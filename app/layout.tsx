import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nurse Verify",
  description: "Nurse disciplinary records search and API demo."
};

const navItems = [
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "API Docs" },
  { href: "/dashboard", label: "Dashboard" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
              <Link href="/" className="focus-ring flex items-center gap-3 rounded-md">
                <span className="flex h-9 w-9 items-center justify-center rounded bg-accent-700 text-sm font-bold text-white">
                  NV
                </span>
                <span className="text-base font-semibold tracking-normal text-slate-950">Nurse Verify</span>
              </Link>
              <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 sm:flex">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="focus-ring rounded-md hover:text-slate-950">
                    {item.label}
                  </Link>
                ))}
              </nav>
              <Link
                href="/dashboard"
                className="focus-ring rounded-md bg-accent-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-accent-900"
              >
                Get Started
              </Link>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <div className="border-y border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm font-medium text-amber-900">
            Sample data shown for demonstration. Not for real screening decisions.
          </div>
          <footer className="bg-white">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <p>&copy; 2026 Nurse Verify. Demo product for nurseverify.io.</p>
              <div className="flex flex-wrap gap-5">
                <Link className="focus-ring rounded-md hover:text-slate-950" href="/status">
                  Status
                </Link>
                <Link className="focus-ring rounded-md hover:text-slate-950" href="/privacy">
                  Privacy
                </Link>
                <Link className="focus-ring rounded-md hover:text-slate-950" href="/terms">
                  Terms
                </Link>
                <Link className="focus-ring rounded-md hover:text-slate-950" href="/contact">
                  Contact
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
