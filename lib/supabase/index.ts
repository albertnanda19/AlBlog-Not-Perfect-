"use server"

import { createServerClient } from "@supabase/ssr"
import { Database } from "../types/supabase"
import { cookies } from "next/headers"

export const createSupabaseServerClient = async () => {
    const cookieStore = cookies()
    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookieStore.get(name)?.value
                },
            },
        }
    )
}