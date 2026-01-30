"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();

  // Explicitly delete all Supabase auth cookies
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();

  // Delete any cookie that starts with 'sb-' (Supabase cookies)
  for (const cookie of allCookies) {
    if (cookie.name.startsWith('sb-')) {
      cookieStore.delete(cookie.name);
    }
  }

  revalidatePath("/", "layout");
  redirect("/admin/login");
}
