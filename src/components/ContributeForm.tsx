"use client";

import { FormEvent, useState } from "react";
import { ImagePlus, Send } from "lucide-react";
import { API_BASE } from "@/lib/memories-api";

type Status = "idle" | "sending" | "sent" | "error";

async function readApiError(response: Response) {
  try {
    const data = (await response.json()) as { detail?: unknown };
    return typeof data.detail === "string" ? data.detail : "Submission failed.";
  } catch {
    return `Submission failed with status ${response.status}.`;
  }
}

export function ContributeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(`${API_BASE}/memories`, {
        method: "POST",
        body: data
      });

      if (!response.ok) {
        throw new Error(await readApiError(response));
      }

      form.reset();
      setStatus("sent");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Could not submit.");
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
      {status === "error" ? <p className="text-sm text-ink/64">{errorMessage}</p> : null}
    </form>
  );
}
