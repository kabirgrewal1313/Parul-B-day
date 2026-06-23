import { NextResponse } from "next/server";

import {
  getMissingSupabaseEnv,
  getSupabaseConfig,
  readSupabaseError,
  supabaseRestFetch
} from "@/lib/server/supabase-rest";

export const runtime = "nodejs";

export async function GET() {
  const config = getSupabaseConfig();

  if (!config) {
    return NextResponse.json({
      status: "error",
      supabase: "missing",
      missing: getMissingSupabaseEnv(),
      storageBucket: null
    });
  }

  const [databaseResponse, storageResponse] = await Promise.all([
    supabaseRestFetch(config, "/rest/v1/memories?select=id&limit=1"),
    supabaseRestFetch(config, `/storage/v1/bucket/${encodeURIComponent(config.storageBucket)}`)
  ]);

  return NextResponse.json({
    status: databaseResponse.ok && storageResponse.ok ? "ok" : "error",
    database: databaseResponse.ok ? "reachable" : await readSupabaseError(databaseResponse),
    storage: storageResponse.ok ? "reachable" : await readSupabaseError(storageResponse),
    storageBucket: config.storageBucket,
    supabase: "configured"
  });
}
