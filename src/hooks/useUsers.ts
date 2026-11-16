import { useEffect, useState } from 'react'
import { USER_TABLE, type AppUser, type UserFormValues } from '@/types/user'
import { notifyTransaction } from '@/utils/notify'
import { supabaseRest } from '@/utils/supabaseRest'

const sortByFullName = (list: AppUser[]) => [...list].sort((a, b) => a.full_name.localeCompare(b.full_name))

export function useUsers() {
    const [users, setUsers] = useState<AppUser[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let active = true
        supabaseRest<AppUser[]>(`${USER_TABLE}?select=*&order=full_name.asc`).then(({ ok, data }) => {
            if (!active) return
            if (ok && Array.isArray(data)) setUsers(sortByFullName(data))
            setLoading(false)
        })
        return () => { active = false }
    }, [])

    const addUser = async (values: UserFormValues) => {
        const { ok, data } = await supabaseRest<AppUser[]>(USER_TABLE, {
            method: 'POST',
            headers: { Prefer: 'return=representation' },
            body: JSON.stringify(values),
        })
        const next: AppUser = data?.[0] ?? { id: crypto.randomUUID(), ...values }
        setUsers((prev) => sortByFullName([...prev, next]))
        notifyTransaction(ok, 'User added', 'Failed to add user')
    }

    return { users, loading, addUser }
}
