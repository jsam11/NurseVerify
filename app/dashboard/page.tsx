import { currentUser } from "@clerk/nextjs/server";
import { DashboardClient } from "@/components/DashboardClient";

export default async function DashboardPage() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? "your account";

  return <DashboardClient initialResults={[]} userEmail={email} />;
}
