import { IRepository } from "./repository";
import { mockRepository } from "./mock-adapter";

// Unified repository selector
export function getRepository(): IRepository {
  // Always defaults safely to mockRepository if Supabase keys aren't configured
  const useMock =
    process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false" ||
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (useMock) {
    return mockRepository;
  }

  // If live Supabase keys are configured in .env, SupabaseAdapter can be returned
  return mockRepository;
}

export const db = getRepository();
