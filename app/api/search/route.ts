import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { searchRecords } from "@/lib/search";

export const dynamic = "force-dynamic";

type SearchRequest = {
  fullName?: unknown;
  state?: unknown;
};

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Authentication required." }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as SearchRequest;
  const fullName = typeof body.fullName === "string" ? body.fullName : "";
  const state = typeof body.state === "string" && body.state.length > 0 ? body.state : undefined;

  const results = await searchRecords(fullName, state);

  return NextResponse.json({ results });
}
