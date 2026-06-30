import { seedRecords } from "@/data/seed-records";
import type { SanctionRecord } from "@/lib/types";

export function searchRecords(fullName: string, state?: string): SanctionRecord[] {
  const query = fullName.trim().toLowerCase();
  const selectedState = state?.trim().toUpperCase();

  return seedRecords.filter((record) => {
    const nameMatches = query.length === 0 || record.fullName.toLowerCase().includes(query);
    const stateMatches = !selectedState || record.state === selectedState;
    return nameMatches && stateMatches;
  });
}
