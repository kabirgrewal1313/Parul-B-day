import "server-only";

import { NextResponse } from "next/server";

export type MemoryRow = {
  id: number;
  name: string;
  message: string;
  image_url: string | null;
  approved: boolean;
  created_at: string;
};

type SupabaseConfig = {
  serviceRoleKey: string;
  storageBucket: string;
  url: string;
};

export function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return null;
  }

  return {
    serviceRoleKey,
    storageBucket: process.env.SUPABASE_STORAGE_BUCKET || "memory-images",
    url
  };
}

export function missingSupabaseConfigResponse() {
  return NextResponse.json(
    {
      detail: "Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel."
    },
    { status: 503 }
  );
}

export async function supabaseRestFetch(config: SupabaseConfig, path: string, init?: RequestInit) {
  const headers = new Headers(init?.headers);
  headers.set("apikey", config.serviceRoleKey);
  headers.set("authorization", `Bearer ${config.serviceRoleKey}`);

  if (init?.body && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }

  return fetch(`${config.url}${path}`, {
    ...init,
    headers,
    cache: "no-store"
  });
}

export async function supabaseStorageUpload(config: SupabaseConfig, path: string, file: File) {
  const headers = new Headers();
  headers.set("apikey", config.serviceRoleKey);
  headers.set("authorization", `Bearer ${config.serviceRoleKey}`);
  headers.set("content-type", file.type || "application/octet-stream");
  headers.set("x-upsert", "false");

  const response = await fetch(`${config.url}/storage/v1/object/${config.storageBucket}/${path}`, {
    body: Buffer.from(await file.arrayBuffer()),
    cache: "no-store",
    headers,
    method: "POST"
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return `${config.url}/storage/v1/object/public/${config.storageBucket}/${path}`;
}
