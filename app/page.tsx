import Link from "next/link";
import { FaqAccordion } from "@/components/FaqAccordion";

const features = [
  ["Source-Verified", "Every result is designed around official Board of Nursing attribution, source links, and refresh dates."],
  ["All 50 States", "A single workflow for searching nurse disciplinary records across state-level regulatory sources."],
  ["API-First for Developers", "Use a clean search endpoint for screening workflows, credentialing portals, and compliance tools."]
];

const useCases = ["Healthcare Employers / Hiring", "Background Screening", "Patient Safety & Research", "Compliance & Credentialing"];

export default function HomePage() {
  return (
    <>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent-700">nurseverify.io</p>
            <h1 className="max-w-3xl text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              Nurse Disciplinary Records Search & API
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Search nurse license revocations, suspensions, surrenders, reprimands, and consent orders across all 50
              states from official Board of Nursing sources.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/sign-up"
                className="focus-ring rounded-md bg-accent-700 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-accent-900"
              >
                Get Started Free
              </Link>
              <Link
                href="/docs"
                className="focus-ring rounded-md border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950 hover:border-slate-400"
              >
                View API Docs
              </Link>
            </div>
          </div>
          <div className="rounded border border-slate-200 bg-slate-50 p-5 shadow-soft">
            <div className="rounded border border-slate-200 bg-white p-4">
              <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="text-sm font-semibold text-slate-950">Sample match</span>
                <span className="rounded bg-accent-50 px-2 py-1 text-xs font-semibold text-accent-700">Source linked</span>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-slate-950">Jordan Sample Rivers</p>
                  <p className="text-slate-500">CA • RN • Suspension</p>
                </div>
                <p className="leading-6 text-slate-600">
                  Official source and last refreshed metadata remain visible for each record in the result set.
                </p>
                <div className="rounded bg-slate-100 p-3 font-mono text-xs text-slate-700">
                  POST /api/search<br />
                  {"{ \"fullName\": \"sample\", \"state\": \"CA\" }"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {features.map(([title, body]) => (
            <article key={title} className="rounded border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-normal text-slate-950">Built for Real Use Cases</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {useCases.map((useCase) => (
              <div key={useCase} className="rounded border border-slate-200 p-5 text-sm font-semibold text-slate-800">
                {useCase}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-normal text-slate-950">Go live in 5 minutes</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {["Create a free key", "Send a search request", "Review source-linked results"].map((step, index) => (
            <div key={step} className="rounded border border-slate-200 bg-white p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded bg-accent-700 text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-5 font-semibold text-slate-950">{step}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Phase 1 uses a demo dashboard and local API shape so teams can validate fit before live integrations.
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-normal">Pricing that starts at free</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Try a small monthly search allowance, then move to simple pay-as-you-go usage as your workflow grows.
            </p>
          </div>
          <Link
            href="/pricing"
            className="focus-ring rounded-md bg-white px-5 py-3 text-center text-sm font-semibold text-slate-950"
          >
            See Pricing
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-3xl font-bold tracking-normal text-slate-950">FAQ</h2>
        <FaqAccordion />
      </section>
    </>
  );
}
