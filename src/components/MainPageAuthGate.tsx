"use client";

import { LockKeyhole, Sparkles } from "lucide-react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { unlockMainPage, type MainPageAuthState } from "@/app/actions";

const initialState: MainPageAuthState = {};

function UnlockButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-ink px-5 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-crystal transition hover:bg-[#314b78] disabled:cursor-not-allowed disabled:opacity-60"
      disabled={pending}
      type="submit"
    >
      <LockKeyhole size={17} />
      {pending ? "Checking" : "Open Story"}
    </button>
  );
}

export function MainPageAuthGate() {
  const [state, formAction] = useActionState(unlockMainPage, initialState);

  return (
    <main className="hero-splash relative grid min-h-svh place-items-center overflow-hidden px-4 py-16 text-ink">
      <div className="hero-splash__background" />
      <form
        action={formAction}
        className="glass-panel relative z-10 w-full max-w-[31rem] rounded-[8px] p-6 text-center sm:p-8"
      >
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full border border-white/80 bg-white/70 text-ink shadow-glow">
          <Sparkles size={22} />
        </div>
        <p className="mb-3 font-chapter text-xs font-semibold uppercase tracking-[0.28em] text-ink/58">
          Answer to enter
        </p>
        <h1 className="mb-6 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          What vegetable is the nickname of Kabir&apos;s ex-crush?
        </h1>
        <label className="sr-only" htmlFor="main-page-answer">
          Answer
        </label>
        <input
          autoComplete="off"
          className="mb-4 w-full rounded-[8px] border border-white/85 bg-white/76 px-4 py-3 text-center text-lg font-semibold text-ink outline-none shadow-inner transition placeholder:text-ink/32 focus:border-periwinkle focus:bg-white focus:ring-4 focus:ring-periwinkle/25"
          id="main-page-answer"
          name="answer"
          placeholder="Type the answer"
          type="text"
        />
        {state.error ? (
          <p className="mb-4 text-sm font-medium text-[#9c385f]" role="alert">
            {state.error}
          </p>
        ) : null}
        <UnlockButton />
      </form>
    </main>
  );
}
