import { NextResponse } from "next/server";

import {
  getSupabaseConfig,
  MemoryRow,
  missingSupabaseConfigResponse,
  supabaseRestFetch,
  supabaseStorageUpload
} from "@/lib/server/supabase-rest";

export const runtime = "nodejs";

function sanitize(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

async function getImageUrl(image: FormDataEntryValue | null) {
  const config = getSupabaseConfig();

  if (!config) {
    return { error: missingSupabaseConfigResponse(), imageUrl: null };
  }

  if (!(image instanceof File) || image.size === 0) {
    return { error: null, imageUrl: null };
  }

  const extension = image.name.split(".").pop()?.toLowerCase();
  if (!extension || !["jpg", "jpeg", "png", "webp"].includes(extension)) {
    return {
      error: NextResponse.json({ detail: "Only image uploads are supported." }, { status: 400 }),
      imageUrl: null
    };
  }

  try {
    const storagePath = `uploads/memory-${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const imageUrl = await supabaseStorageUpload(config, storagePath, image);

    return { error: null, imageUrl };
  } catch (error) {
    return {
      error: NextResponse.json(
        { detail: error instanceof Error ? error.message : "Image upload failed." },
        { status: 500 }
      ),
      imageUrl: null
    };
  }
}

export async function GET() {
  const config = getSupabaseConfig();

  if (!config) {
    return missingSupabaseConfigResponse();
  }

  const response = await supabaseRestFetch(
    config,
    "/rest/v1/memories?select=*&approved=eq.true&order=created_at.desc"
  );

  if (!response.ok) {
    return NextResponse.json({ detail: await response.text() }, { status: response.status });
  }

  return NextResponse.json((await response.json()) as MemoryRow[]);
}

export async function POST(request: Request) {
  const config = getSupabaseConfig();

  if (!config) {
    return missingSupabaseConfigResponse();
  }

  const formData = await request.formData();
  const name = sanitize(formData.get("name"));
  const message = sanitize(formData.get("message"));

  if (!name || !message) {
    return NextResponse.json({ detail: "Name and message are required." }, { status: 400 });
  }

  const { error, imageUrl } = await getImageUrl(formData.get("image"));

  if (error) {
    return error;
  }

  const response = await supabaseRestFetch(config, "/rest/v1/memories", {
    body: JSON.stringify({
      approved: false,
      image_url: imageUrl,
      message,
      name
    }),
    headers: {
      Prefer: "return=representation"
    },
    method: "POST"
  });

  if (!response.ok) {
    return NextResponse.json({ detail: await response.text() }, { status: response.status });
  }

  const rows = (await response.json()) as MemoryRow[];

  if (!rows[0]) {
    return NextResponse.json({ detail: "Failed to save memory." }, { status: 500 });
  }

  return NextResponse.json(rows[0], { status: 201 });
}
