import { PostgrestError } from "@supabase/supabase-js";

export interface SupabaseResponse<T> {
    data: T;
    error?: PostgrestError;
}
