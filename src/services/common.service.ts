import { PostgrestError } from "@supabase/supabase-js";

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}
