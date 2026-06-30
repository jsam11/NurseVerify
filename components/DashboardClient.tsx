"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { states } from "@/lib/states";
import type { SanctionRecord, SanctionType } from "@/lib/types";

type SearchHistoryItem = {
  id: string;
  fullName: string;
  state: string;
  timestamp: string;
};

const sanctionLabels: Record<SanctionType, string> = {
  REVOCATION: "Revocation",
  SUSPENSION: "Suspension",
  VOLUNTARY_SURRENDER: "Voluntary Surrender",
  REPRIMAND: "Reprimand",
  PROBATION: "Probation",
  CONSENT_ORDER: "Consent Order",
  FINE: "Fine",
  DENIAL: "Denial"
};

const sanctionStyles: Record<SanctionType, string> = {
  REVOCATION: "bg-rose-100 text-rose-800",
  SUSPENSION: "bg-orange-100 text-orange-800",
  VOLUNTARY_SURRENDER: "bg-slate-200 text-slate-800",
  REPRIMAND: "bg-yellow-100 text-yellow-800",
  PROBATION: "bg-blue-100 text-blue-800",
  CONSENT_ORDER: "bg-accent-50 text-accent-700",
  FINE: "bg-purple-100 text-purple-800",
  DENIAL: "bg-red-100 text-red-800"
};

const statePositions: Record<string, { x: number; y: number }> = {
  CA: { x: 76, y: 228 },
  TX: { x: 230, y: 296 },
  FL: { x: 355, y: 330 },
  NY: { x: 445, y: 127 },
  WA: { x: 93, y: 59 },
  IL: { x: 319, y: 176 },
  PA: { x: 423, y: 155 },
  OH: { x: 373, y: 172 },
  GA: { x: 360, y: 266 },
  NC: { x: 407, y: 241 },
  AZ: { x: 146, y: 247 },
  CO: { x: 207, y: 207 },
  MA: { x: 475, y: 128 },
  OR: { x: 86, y: 119 }
};

function formatDate(value: string | null) {
  if (!value) return "Date unavailable";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

function formatTimestamp(value: string) {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
    month: "short",
    day: "numeric"
  }).format(new Date(value));
}

function SanctionBadge({ type }: { type: SanctionType }) {
  return (
    <span className={`rounded px-2 py-1 text-xs font-semibold ${sanctionStyles[type]}`}>{sanctionLabels[type]}</span>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm text-slate-900">{value}</dd>
    </div>
  );
}

function MapView({
  results,
  selectedState,
  onSelectState
}: {
  results: SanctionRecord[];
  selectedState: string;
  onSelectState: (state: string) => void;
}) {
  const counts = useMemo(() => {
    return results.reduce<Record<string, number>>((accumulator, record) => {
      accumulator[record.state] = (accumulator[record.state] ?? 0) + 1;
      return accumulator;
    }, {});
  }, [results]);

  return (
    <div className="rounded border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Map View</h2>
          <p className="mt-1 text-sm text-slate-600">Dots appear for states represented in the current results.</p>
        </div>
        {selectedState ? (
          <button
            type="button"
            className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:border-slate-400"
            onClick={() => onSelectState("")}
          >
            Clear map filter
          </button>
        ) : null}
      </div>
      <svg className="mt-5 h-auto w-full" viewBox="0 0 520 370" role="img" aria-label="United States map with result dots">
        <path
          d="M61 80 L102 49 L163 67 L223 77 L281 94 L339 92 L392 105 L456 93 L492 136 L474 183 L442 223 L410 260 L391 335 L337 312 L285 314 L234 331 L177 304 L121 280 L79 242 L45 184 Z"
          fill="#f1f5f9"
          stroke="#cbd5e1"
          strokeWidth="2"
        />
        <path d="M377 272 L421 282 L454 337 L391 335 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="2" />
        <path d="M80 118 L113 65 M146 249 L204 207 M317 178 L373 172 M358 266 L407 241" stroke="#cbd5e1" />
        {Object.entries(counts).map(([state, count]) => {
          const position = statePositions[state];
          if (!position) return null;
          const isSelected = selectedState === state;
          return (
            <g
              key={state}
              role="button"
              tabIndex={0}
              className="cursor-pointer focus:outline-none"
              onClick={() => onSelectState(state)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectState(state);
                }
              }}
              aria-label={`Filter results to ${state}`}
            >
              <circle
                cx={position.x}
                cy={position.y}
                r={isSelected ? 10 : 7}
                fill={isSelected ? "#0b6f63" : "#0f8f7e"}
                stroke="#ffffff"
                strokeWidth="3"
              />
              <text x={position.x + 11} y={position.y + 4} className="fill-slate-700 text-[11px] font-semibold">
                {state} {count}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function DashboardClient({ initialResults, userEmail }: { initialResults: SanctionRecord[]; userEmail: string }) {
  const [fullName, setFullName] = useState("");
  const [state, setState] = useState("");
  const [results, setResults] = useState(initialResults);
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<SanctionRecord | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  async function runSearch(nextState = state, shouldRecordHistory = true) {
    setIsSearching(true);
    setSearchError(null);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, state: nextState || undefined })
      });

      if (!response.ok) {
        throw new Error("Search is temporarily unavailable.");
      }

      const data = (await response.json()) as { results: SanctionRecord[] };
      setResults(data.results);

      if (shouldRecordHistory) {
        setHistory((items) =>
          [
            {
              id: `${Date.now()}`,
              fullName: fullName.trim() || "All names",
              state: nextState || "All states",
              timestamp: new Date().toISOString()
            },
            ...items
          ].slice(0, 5)
        );
      }
    } catch {
      setResults([]);
      setSearchError("Database search is unavailable. Confirm DATABASE_URL is set and migrations have run.");
    } finally {
      setIsSearching(false);
    }
  }

  useEffect(() => {
    let isActive = true;

    async function loadInitialResults() {
      try {
        const response = await fetch("/api/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fullName: "" })
        });

        if (!response.ok) {
          throw new Error("Initial search failed.");
        }

        const data = (await response.json()) as { results: SanctionRecord[] };
        if (isActive) {
          setResults(data.results);
          setSearchError(null);
        }
      } catch {
        if (isActive) {
          setResults([]);
          setSearchError("Database search is unavailable. Confirm DATABASE_URL is set and migrations have run.");
        }
      }
    }

    void loadInitialResults();

    return () => {
      isActive = false;
    };
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void runSearch();
  }

  function handleMapState(nextState: string) {
    setState(nextState);
    void runSearch(nextState);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-700">Demo Dashboard</p>
        <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">Nurse Verify Search</h1>
        <p className="mt-2 text-sm text-slate-600">Welcome back, {userEmail}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="space-y-6">
          <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Usage this month</h2>
                <p className="mt-1 text-sm text-slate-600">Current plan: Free Tier</p>
              </div>
              <button
                type="button"
                className="focus-ring rounded-md bg-accent-700 px-3 py-2 text-sm font-semibold text-white hover:bg-accent-900"
              >
                Upgrade
              </button>
            </div>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-sm">
                <span className="font-semibold text-slate-950">2 / 5 searches used</span>
                <span className="text-slate-500">40%</span>
              </div>
              <div className="h-3 rounded bg-slate-100">
                <div className="h-3 w-[40%] rounded bg-accent-700" />
              </div>
              <p className="mt-3 text-xs text-slate-500">Resets on the first day of next month.</p>
            </div>
          </section>

          <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Quick Search</h2>
            <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">Full Name</span>
                <input
                  className="focus-ring mt-2 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-950"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  placeholder="Jordan Sample Rivers"
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-slate-700">State</span>
                <select
                  className="focus-ring mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-950"
                  value={state}
                  onChange={(event) => setState(event.target.value)}
                >
                  <option value="">All states</option>
                  {states.map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              <button
                type="submit"
                className="focus-ring w-full rounded-md bg-accent-700 px-4 py-3 text-sm font-semibold text-white hover:bg-accent-900 disabled:cursor-not-allowed disabled:bg-slate-400"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </form>
          </section>

          <section className="rounded border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-950">Search History</h2>
            <div className="mt-4 space-y-3">
              {history.length === 0 ? (
                <p className="text-sm text-slate-600">Recent searches will appear here.</p>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="rounded bg-slate-50 p-3">
                    <p className="text-sm font-semibold text-slate-950">
                      {item.fullName} • {item.state}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">{formatTimestamp(item.timestamp)}</p>
                  </div>
                ))
              )}
            </div>
          </section>
        </aside>

        <div className="space-y-6">
          <MapView results={results} selectedState={state} onSelectState={handleMapState} />

          <section>
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-normal text-slate-950">Results</h2>
                <p className="mt-1 text-sm text-slate-600">{results.length} source-attributed demo records found.</p>
              </div>
            </div>
            {searchError ? (
              <div className="mb-4 rounded border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
                {searchError}
              </div>
            ) : null}
            <div className="space-y-4">
              {results.map((record) => (
                <article key={record.recordId} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-slate-950">{record.fullName}</h3>
                        <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                          {record.state}
                        </span>
                        <SanctionBadge type={record.sanctionType} />
                      </div>
                      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                        <Field label="Effective Date" value={formatDate(record.effectiveDate)} />
                        <Field label="Employer / Facility" value={record.employerOrFacility ?? "Unavailable"} />
                        <Field label="License" value={`${record.licenseType}${record.licenseNumber ? ` • ${record.licenseNumber}` : ""}`} />
                        <Field label="Last Refreshed" value={formatDate(record.lastRefreshed)} />
                      </dl>
                      <a
                        className="focus-ring mt-4 inline-flex rounded-md text-sm font-semibold text-accent-700 hover:text-accent-900"
                        href={record.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Official source ({record.sourceType})
                      </a>
                    </div>
                    <button
                      type="button"
                      className="focus-ring rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:border-slate-400"
                      onClick={() => setSelectedRecord(record)}
                    >
                      View details
                    </button>
                  </div>
                </article>
              ))}
              {results.length === 0 ? (
                <div className="rounded border border-slate-200 bg-white p-8 text-center text-slate-600">
                  No matching sample records. Try a broader name or clear the state filter.
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>

      {selectedRecord ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" role="dialog" aria-modal="true">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded bg-white p-6 shadow-soft">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold tracking-normal text-slate-950">{selectedRecord.fullName}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                    {selectedRecord.state}
                  </span>
                  <SanctionBadge type={selectedRecord.sanctionType} />
                </div>
              </div>
              <button
                type="button"
                className="focus-ring rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700"
                onClick={() => setSelectedRecord(null)}
              >
                Close
              </button>
            </div>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Effective Date" value={formatDate(selectedRecord.effectiveDate)} />
              <Field label="Employer / Facility" value={selectedRecord.employerOrFacility ?? "Unavailable"} />
              <Field label="Freshness" value={formatDate(selectedRecord.lastRefreshed)} />
              <Field label="License" value={`${selectedRecord.licenseType}${selectedRecord.licenseNumber ? ` • ${selectedRecord.licenseNumber}` : ""}`} />
            </dl>
            <div className="mt-6">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Grounds / Reason</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700">{selectedRecord.reason}</p>
            </div>
            <a
              href={selectedRecord.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-6 inline-flex rounded-md bg-accent-700 px-4 py-3 text-sm font-semibold text-white hover:bg-accent-900"
            >
              View official source -&gt;
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
