import { createClient } from '@supabase/supabase-js';

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  
  if (!url || !key) {
    console.warn("⚠️ Supabase environment variables are missing! Using dummy client.");
    // Return a proxy that just ignores calls or handles them gracefully
    return {
      from: () => ({
        select: () => ({
          order: () => ({
            range: () => Promise.resolve({ data: [], error: { message: "Missing Supabase Keys" } }),
            limit: () => Promise.resolve({ data: [], error: { message: "Missing Supabase Keys" } }),
          }),
          eq: () => ({
            order: () => ({
              limit: () => Promise.resolve({ data: [], error: { message: "Missing Supabase Keys" } }),
            }),
            single: () => Promise.resolve({ data: null, error: { message: "Missing Supabase Keys" } }),
            neq: () => ({
              order: () => ({
                limit: () => Promise.resolve({ data: [], error: { message: "Missing Supabase Keys" } }),
              }),
            }),
          }),
        }),
        insert: () => Promise.resolve({ data: null, error: { message: "Missing Supabase Keys" } }),
      }),
    } as any;
  }

  return createClient(url, key);
}
