import { NextResponse } from "next/server";
import { searchRecords } from "@/lib/search";

type SearchRequest = {
  fullName?: unknown;
  state?: unknown;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as SearchRequest;
  const fullName = typeof body.fullName === "string" ? body.fullName : "";
  const state = typeof body.state === "string" && body.state.length > 0 ? body.state : undefined;

  return NextResponse.json({ results: searchRecords(fullName, state) });
}
