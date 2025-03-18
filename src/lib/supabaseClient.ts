import {createClient} from "@supabase/supabase-js";

if (!process.env.NEXT_PUBLIC_PROJECT_URL || !process.env.NEXT_PUBLIC_API_KEY) {
    console.log('pouette')
    throw new Error('Missing Supabase environment variables');
}

export const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_PROJECT_URL,
    process.env.NEXT_PUBLIC_API_KEY
)
