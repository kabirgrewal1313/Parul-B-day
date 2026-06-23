"use client";

import { FormEvent, useState } from "react";
import { ImagePlus, Send } from "lucide-react";
import { API_BASE } from "@/lib/memories-api";

type Status = "idle" | "sending" | "sent" | "error";

export function ContributeForm() {
  const [status, setStatus] = useState<Status>("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(`${API_BASE}/memories`, {
        method: "POST",
        body: data
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="glass-panel grid gap-5 p-6 sm:p-8" onSubmit={submit}>
      <label className="grid gap-2">
        <span className="text-sm uppercase text-ink/56">Friend name</span>
        <input className="border border-white/80 bg-white/74 px-4 py-3 outline-none focus:border-[#bbd8ff]" name="name" required />
      </label>
      <label className="grid gap-2">
        <span className="text-sm uppercase text-ink/56">Memory message</span>
        <textarea
          className="min-h-44 resize-y border border-white/80 bg-white/74 px-4 py-3 leading-7 outline-none focus:border-[#bbd8ff]"
          name="message"
          required
        />
      </label>
      <label className="grid gap-2">
        <span className="text-sm uppercase text-ink/56">Image</span>
        <span className="flex cursor-pointer items-center gap-3 border border-dashed border-[#bbd8ff] bg-white/50 px-4 py-5 text-ink/70">
          <ImagePlus size={19} />
          Upload a friend photo or memory image
          <input accept="image/*" className="sr-only" name="image" type="file" />
        </span>
      </label>
      <button
        className="flex items-center justify-center gap-3 bg-ink px-6 py-4 text-white transition hover:bg-[#35517c] disabled:opacity-60"
        disabled={status === "sending"}
        type="submit"
      >
        <Send size={18} />
        {status === "sending" ? "Sending..." : "Submit memory"}
      </button>
      {status === "sent" ? <p className="text-sm text-ink/64">Submitted for approval.</p> : null}
      {status === "error" ? <p className="text-sm text-ink/64">Could not submit. Check that the API is deployed and Supabase env vars are configured.</p> : null}
    </form>
  );
}
