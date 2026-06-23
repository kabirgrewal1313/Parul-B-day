import { NextResponse } from "next/server";

import { getSupabaseConfig } from "@/lib/server/supabase-rest";

export const runtime = "nodejs";

export function GET() {
  const config = getSupabaseConfig();

  return NextResponse.json({
    status: "ok",
    supabase: config ? "configured" : "missing",
    storageBucket: config?.storageBucket ?? null
  });
}
