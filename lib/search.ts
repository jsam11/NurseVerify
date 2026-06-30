import { prisma } from "@/lib/prisma";
import type { SanctionRecord } from "@/lib/types";

export async function searchRecords(fullName: string, state?: string): Promise<SanctionRecord[]> {
  const query = fullName.trim();
  const selectedState = state?.trim().toUpperCase();

  const records = await prisma.sanctionRecord.findMany({
    where: {
      ...(query
        ? {
            fullName: {
              contains: query,
              mode: "insensitive"
            }
          }
        : {}),
      ...(selectedState ? { state: selectedState } : {})
    },
    orderBy: [{ fullName: "asc" }, { effectiveDate: "desc" }],
    take: 100
  });

  return records.map((record) => ({
    recordId: record.recordId,
    fullName: record.fullName,
    state: record.state,
    licenseType: record.licenseType,
    licenseNumber: record.licenseNumber,
    sanctionType: record.sanctionType,
    effectiveDate: record.effectiveDate,
    employerOrFacility: record.employerOrFacility,
    reason: record.reason,
    sourceUrl: record.sourceUrl,
    sourceType: record.sourceType,
    lastRefreshed: record.lastRefreshed
  }));
}
