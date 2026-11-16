const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export interface SupabaseResult<T> {
    ok: boolean
    data: T | null
}

export async function supabaseRest<T>(path: string, init?: RequestInit): Promise<SupabaseResult<T>> {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return { ok: false, data: null }
    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
            ...init,
            headers: {
                apikey: SUPABASE_ANON_KEY,
                Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                ...(init?.headers ?? {}),
            },
        })
        if (!res.ok) return { ok: false, data: null }
        if (res.status === 204) return { ok: true, data: null }
        return { ok: true, data: (await res.json()) as T }
    } catch {
        return { ok: false, data: null }
    }
}
