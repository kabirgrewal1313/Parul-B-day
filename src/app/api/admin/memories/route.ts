import { NextResponse } from "next/server";

import {
  getSupabaseConfig,
  MemoryRow,
  missingSupabaseConfigResponse,
  readSupabaseError,
  supabaseRestFetch
} from "@/lib/server/supabase-rest";

export const runtime = "nodejs";

export async function GET() {
  const config = getSupabaseConfig();

  if (!config) {
    return missingSupabaseConfigResponse();
  }

  const response = await supabaseRestFetch(config, "/rest/v1/memories?select=*&order=created_at.desc");

  if (!response.ok) {
    return NextResponse.json({ detail: await readSupabaseError(response) }, { status: response.status });
  }

  return NextResponse.json((await response.json()) as MemoryRow[]);
}
