export type LicenseType = "RN" | "LPN" | "APRN" | "CNA" | "OTHER";

export type SanctionType =
  | "REVOCATION"
  | "SUSPENSION"
  | "VOLUNTARY_SURRENDER"
  | "REPRIMAND"
  | "PROBATION"
  | "CONSENT_ORDER"
  | "FINE"
  | "DENIAL";

export type SanctionRecord = {
  recordId: string;
  fullName: string;
  state: string;
  licenseType: LicenseType;
  licenseNumber: string | null;
  sanctionType: SanctionType;
  effectiveDate: string | null;
  employerOrFacility: string | null;
  reason: string;
  sourceUrl: string;
  sourceType: "WEBPAGE" | "PDF";
  lastRefreshed: string;
};
