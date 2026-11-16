import { useEffect, useState } from 'react'
import { EMPLOYEE_TABLE, type Employee, type EmployeeFormValues } from '@/types/employee'
import { notifyTransaction } from '@/utils/notify'
import { supabaseRest } from '@/utils/supabaseRest'

const sortByFirstName = (list: Employee[]) => [...list].sort((a, b) => a.f_name.localeCompare(b.f_name))

export function useEmployees() {
    const [employees, setEmployees] = useState<Employee[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let active = true
        supabaseRest<Employee[]>(`${EMPLOYEE_TABLE}?select=*&order=f_name.asc`).then(({ ok, data }) => {
            if (!active) return
            if (ok && Array.isArray(data)) setEmployees(sortByFirstName(data))
            setLoading(false)
        })
        return () => { active = false }
    }, [])

    const addEmployee = async (values: EmployeeFormValues) => {
        const { ok, data } = await supabaseRest<Employee[]>(EMPLOYEE_TABLE, {
            method: 'POST',
            headers: { Prefer: 'return=representation' },
            body: JSON.stringify(values),
        })
        const next: Employee = data?.[0] ?? { id: crypto.randomUUID(), ...values }
        setEmployees((prev) => sortByFirstName([...prev, next]))
        notifyTransaction(ok, 'Employee added', 'Failed to add employee')
    }

    const updateEmployee = async (id: string, values: EmployeeFormValues) => {
        const { ok } = await supabaseRest<Employee[]>(`${EMPLOYEE_TABLE}?id=eq.${encodeURIComponent(id)}`, {
            method: 'PATCH',
            headers: { Prefer: 'return=representation' },
            body: JSON.stringify(values),
        })
        setEmployees((prev) => sortByFirstName(prev.map((emp) => (emp.id === id ? { ...emp, ...values } : emp))))
        notifyTransaction(ok, 'Employee updated', 'Failed to update employee')
    }

    const deleteEmployee = async (id: string) => {
        const { ok } = await supabaseRest<null>(`${EMPLOYEE_TABLE}?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' })
        setEmployees((prev) => prev.filter((emp) => emp.id !== id))
        notifyTransaction(ok, 'Employee deleted', 'Failed to delete employee')
    }

    return { employees, loading, addEmployee, updateEmployee, deleteEmployee }
}
