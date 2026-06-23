"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type MainPageAuthState = {
  error?: string;
};

export async function unlockMainPage(
  _previousState: MainPageAuthState,
  formData: FormData
): Promise<MainPageAuthState> {
  const answer = String(formData.get("answer") ?? "").trim();

  if (answer.toLocaleLowerCase("en-US") !== "kathal") {
    return {
      error: "That answer does not open the story."
    };
  }

  const cookieStore = await cookies();

  cookieStore.set("parul_main_page_unlocked", "true", {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax"
  });

  redirect("/");
}
