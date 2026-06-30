import { DashboardClient } from "@/components/DashboardClient";
import { seedRecords } from "@/data/seed-records";

export default function DashboardPage() {
  return <DashboardClient initialResults={seedRecords} />;
}
