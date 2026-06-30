export default function DocsPage() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent-700">API Docs</p>
      <h1 className="mt-3 text-4xl font-bold tracking-normal text-slate-950">Search API</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        The search endpoint queries Postgres and returns source-attributed sanction records. Name matching is fuzzy
        contains matching, case-insensitive, and every returned record must include official source verification.
      </p>
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Request</h2>
          <pre className="mt-4 overflow-x-auto rounded bg-slate-950 p-4 text-sm text-slate-100">
            <code>{`POST /api/search
Content-Type: application/json

{
  "fullName": "Jordan Sample",
  "state": "CA"
}`}</code>
          </pre>
        </article>
        <article className="rounded border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Response</h2>
          <pre className="mt-4 overflow-x-auto rounded bg-slate-950 p-4 text-sm text-slate-100">
            <code>{`{
  "results": [
    {
      "recordId": "NV-DEMO-0001",
      "fullName": "Jordan Sample Rivers",
      "state": "CA",
      "licenseType": "RN",
      "licenseNumber": "CA-DEMO-RN-1024",
      "sanctionType": "SUSPENSION",
      "effectiveDate": "2024-02-12",
      "employerOrFacility": "Sample Valley Medical Center",
      "reason": "Fictional record...",
      "sourceUrl": "https://example-bon.ca.gov/discipline/NV-DEMO-0001",
      "sourceType": "WEBPAGE",
      "lastRefreshed": "2026-06-10"
    }
  ]
}`}</code>
          </pre>
        </article>
      </div>
      <article className="mt-6 rounded border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Source verification</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          API consumers should treat `sourceUrl`, `sourceType`, and `lastRefreshed` as required compliance fields.
          Records without official source attribution should not be displayed or used for screening workflows.
        </p>
      </article>
    </section>
  );
}
