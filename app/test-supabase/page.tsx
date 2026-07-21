"use client";

import { supabase } from "@/lib/supabase/client";

export default function TestSupabasePage() {
  async function testConnection() {
    const { data, error } = await supabase
      .from("test_connection")
      .select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <button
        onClick={testConnection}
        className="px-6 py-3 rounded-xl bg-green-700 text-white hover:bg-green-800"
      >
        Test Supabase
      </button>
    </main>
  );
}