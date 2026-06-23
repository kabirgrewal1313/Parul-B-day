"use client";

import { useEffect, useState } from "react";
import { Check, RefreshCw } from "lucide-react";
import { MemoryImage } from "@/components/MemoryImage";
import { API_BASE } from "@/lib/memories-api";

type AdminMemory = {
  id: number;
  name: string;
  message: string;
  image_url: string | null;
  approved: boolean;
  created_at: string;
};

export function AdminDashboard() {
  const [items, setItems] = useState<AdminMemory[]>([]);
  const [status, setStatus] = useState("Loading moderation queue...");

  const load = async () => {
    setStatus("Loading moderation queue...");
    try {
      const response = await fetch(`${API_BASE}/admin/memories`);
      if (!response.ok) {
        throw new Error("Unable to load");
      }
      const data = (await response.json()) as AdminMemory[];
      setItems(data);
      setStatus(data.length ? "Queue loaded." : "No submissions yet.");
    } catch {
      setStatus("API is unavailable or Supabase env vars are not configured.");
    }
  };

  const approve = async (id: number) => {
    await fetch(`${API_BASE}/admin/memories/${id}/approve`, {
      method: "POST"
    });
    await load();
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-ink/64">{status}</p>
        <button className="flex items-center gap-2 border border-white/80 bg-white/64 px-4 py-3" onClick={load} type="button">
          <RefreshCw size={17} />
          Refresh
        </button>
      </div>
      <div className="grid gap-4">
        {items.map((item) => (
          <article className="glass-panel grid gap-5 p-5 lg:grid-cols-[minmax(160px,280px)_1fr_auto]" key={item.id}>
            {item.image_url ? (
              <MemoryImage
                alt={item.name}
                className="rounded-sm"
                maxHeightClass="max-h-72"
                src={item.image_url}
              />
            ) : (
              <div className="grid min-h-44 place-items-center rounded-sm bg-white/60 text-sm text-ink/45">No image</div>
            )}
            <div>
              <p className="text-sm uppercase text-ink/52">{item.approved ? "Approved" : "Pending"}</p>
              <h2 className="mt-2 font-display text-4xl">{item.name}</h2>
              <p className="mt-4 leading-7 text-ink/70">{item.message}</p>
              <p className="mt-4 text-xs text-ink/42">{item.created_at}</p>
            </div>
            <button
              className="flex h-12 items-center justify-center gap-2 bg-ink px-5 text-white disabled:bg-ink/35"
              disabled={item.approved}
              onClick={() => approve(item.id)}
              type="button"
            >
              <Check size={18} />
              Approve
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
