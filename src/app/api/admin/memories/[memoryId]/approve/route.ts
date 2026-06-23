import { NextResponse } from "next/server";

import {
  getSupabaseConfig,
  MemoryRow,
  missingSupabaseConfigResponse,
  readSupabaseError,
  supabaseRestFetch
} from "@/lib/server/supabase-rest";

export const runtime = "nodejs";

export async function POST(_request: Request, context: { params: Promise<{ memoryId: string }> }) {
  const config = getSupabaseConfig();

  if (!config) {
    return missingSupabaseConfigResponse();
  }

  const { memoryId } = await context.params;
  const id = Number(memoryId);

  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ detail: "Invalid memory id." }, { status: 400 });
  }

  const response = await supabaseRestFetch(config, `/rest/v1/memories?id=eq.${id}&select=*`, {
    body: JSON.stringify({ approved: true }),
    headers: {
      Prefer: "return=representation"
    },
    method: "PATCH"
  });

  if (!response.ok) {
    return NextResponse.json({ detail: await readSupabaseError(response) }, { status: response.status });
  }

  const rows = (await response.json()) as MemoryRow[];

  if (!rows[0]) {
    return NextResponse.json({ detail: "Memory not found." }, { status: 404 });
  }

  return NextResponse.json(rows[0]);
}
