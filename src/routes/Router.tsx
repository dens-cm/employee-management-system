import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedLayout from '@/components/Layout/ProtectedLayout'
import Login from '@/pages/Authentication/Login'
import Dashboard from '@/pages/Protected/Dashboard'
import Employees from '@/pages/Protected/Employees'
import Users from '@/pages/Protected/Users'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Navigate to='/dashboard' replace />} />
                <Route path='/login' element={<Login />} />
                <Route element={<ProtectedLayout />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/employees' element={<Employees />} />
                    <Route path='/users' element={<Users />} />
                </Route>
                <Route path='*' element={<Navigate to='/dashboard' replace />} />
            </Routes>
        </BrowserRouter>
    )
}
