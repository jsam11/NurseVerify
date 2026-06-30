const tiers = [
  { searches: "1-5", price: "$0", note: "Free demo allowance for light evaluation." },
  { searches: "6-1,000", price: "$0.35 / search", note: "Placeholder pay-as-you-go tier." },
  { searches: "1,001+", price: "Custom", note: "Volume pricing placeholder for larger workflows." }
];

export default function PricingPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent-700">Pricing</p>
      <h1 className="mt-3 text-4xl font-bold tracking-normal text-slate-950">Pay only when you search</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Placeholder pricing for the Phase 1 demo. Billing, metering, and plan enforcement are not implemented yet.
      </p>
      <div className="mt-10 overflow-hidden rounded border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4 font-semibold">Monthly searches</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {tiers.map((tier) => (
              <tr key={tier.searches}>
                <td className="px-6 py-5 font-semibold text-slate-950">{tier.searches}</td>
                <td className="px-6 py-5 text-slate-800">{tier.price}</td>
                <td className="px-6 py-5 text-slate-600">{tier.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
