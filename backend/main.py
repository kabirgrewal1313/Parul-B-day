from __future__ import annotations

import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Annotated

from dotenv import load_dotenv
from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from supabase import Client, create_client

ROOT = Path(__file__).resolve().parent
PROJECT_ROOT = ROOT.parent
load_dotenv(PROJECT_ROOT / ".env")
load_dotenv(PROJECT_ROOT / ".env.local")
load_dotenv(ROOT / ".env")

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_SERVICE_ROLE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")
STORAGE_BUCKET = os.getenv("SUPABASE_STORAGE_BUCKET", "memory-images")

cors_origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "http://localhost:3002",
    "http://127.0.0.1:3002",
    "http://localhost:3003",
    "http://127.0.0.1:3003",
]
frontend_urls = [
    *os.getenv("FRONTEND_URL", "").split(","),
    *os.getenv("FRONTEND_URLS", "").split(","),
]
for frontend_url in frontend_urls:
    frontend_url = frontend_url.strip().rstrip("/")
    if frontend_url and frontend_url not in cors_origins:
        cors_origins.append(frontend_url)

app = FastAPI(
    title="Parul's Story API",
    docs_url=None,
    redoc_url=None,
    openapi_url=None,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class MemoryOut(BaseModel):
    id: int
    name: str
    message: str
    image_url: str | None
    approved: bool
    created_at: str


def get_supabase() -> Client:
    if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
        raise HTTPException(
            status_code=503,
            detail="Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.",
        )
    return create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)


def row_to_memory(row: dict) -> MemoryOut:
    return MemoryOut(
        id=row["id"],
        name=row["name"],
        message=row["message"],
        image_url=row.get("image_url"),
        approved=bool(row["approved"]),
        created_at=str(row["created_at"]),
    )


def save_upload(upload: UploadFile | None) -> str | None:
    if upload is None or not upload.filename:
        return None

    extension = Path(upload.filename).suffix.lower()
    if extension not in {".jpg", ".jpeg", ".png", ".webp"}:
        raise HTTPException(status_code=400, detail="Only image uploads are supported.")

    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d%H%M%S%f")
    storage_path = f"uploads/memory-{timestamp}{extension}"
    content = upload.file.read()
    content_type = upload.content_type or "application/octet-stream"

    supabase = get_supabase()
    supabase.storage.from_(STORAGE_BUCKET).upload(
        storage_path,
        content,
        {"content-type": content_type, "upsert": False},
    )
    return supabase.storage.from_(STORAGE_BUCKET).get_public_url(storage_path)


@app.get("/health")
def health() -> dict[str, str]:
    configured = bool(SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY)
    return {"status": "ok", "supabase": "configured" if configured else "missing"}


@app.get("/memories", response_model=list[MemoryOut])
def list_approved_memories() -> list[MemoryOut]:
    supabase = get_supabase()
    result = (
        supabase.table("memories")
        .select("*")
        .eq("approved", True)
        .order("created_at", desc=True)
        .execute()
    )
    return [row_to_memory(row) for row in result.data]


@app.post("/memories", response_model=MemoryOut)
def create_memory(
    name: Annotated[str, Form()],
    message: Annotated[str, Form()],
    image: Annotated[UploadFile | None, File()] = None,
) -> MemoryOut:
    image_url = save_upload(image)
    supabase = get_supabase()

    result = (
        supabase.table("memories")
        .insert(
            {
                "name": name.strip(),
                "message": message.strip(),
                "image_url": image_url,
                "approved": False,
            }
        )
        .execute()
    )

    if not result.data:
        raise HTTPException(status_code=500, detail="Failed to save memory.")

    return row_to_memory(result.data[0])


@app.get("/admin/memories", response_model=list[MemoryOut])
def list_all_memories() -> list[MemoryOut]:
    supabase = get_supabase()
    result = supabase.table("memories").select("*").order("created_at", desc=True).execute()
    return [row_to_memory(row) for row in result.data]


@app.post("/admin/memories/{memory_id}/approve", response_model=MemoryOut)
def approve_memory(memory_id: int) -> MemoryOut:
    supabase = get_supabase()
    result = (
        supabase.table("memories")
        .update({"approved": True})
        .eq("id", memory_id)
        .select("*")
        .execute()
    )

    if not result.data:
        raise HTTPException(status_code=404, detail="Memory not found.")

    return row_to_memory(result.data[0])
