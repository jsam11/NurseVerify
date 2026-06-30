-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "LicenseType" AS ENUM ('RN', 'LPN', 'APRN', 'CNA', 'OTHER');

-- CreateEnum
CREATE TYPE "SanctionType" AS ENUM ('REVOCATION', 'SUSPENSION', 'VOLUNTARY_SURRENDER', 'REPRIMAND', 'PROBATION', 'CONSENT_ORDER', 'FINE', 'DENIAL');

-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('WEBPAGE', 'PDF');

-- CreateTable
CREATE TABLE "SanctionRecord" (
  "recordId" TEXT NOT NULL,
  "fullName" TEXT NOT NULL,
  "state" TEXT NOT NULL,
  "licenseType" "LicenseType" NOT NULL,
  "licenseNumber" TEXT,
  "sanctionType" "SanctionType" NOT NULL,
  "effectiveDate" TEXT,
  "employerOrFacility" TEXT,
  "reason" TEXT NOT NULL,
  "sourceUrl" TEXT NOT NULL,
  "sourceType" "SourceType" NOT NULL,
  "lastRefreshed" TEXT NOT NULL,

  CONSTRAINT "SanctionRecord_pkey" PRIMARY KEY ("recordId")
);

-- CreateIndex
CREATE INDEX "SanctionRecord_fullName_idx" ON "SanctionRecord"("fullName");

-- CreateIndex
CREATE INDEX "SanctionRecord_state_idx" ON "SanctionRecord"("state");
