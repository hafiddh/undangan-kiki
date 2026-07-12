"use server";

import { createClient } from "@/lib/supabase/server";
import { refresh } from "next/cache";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  refresh();
}
