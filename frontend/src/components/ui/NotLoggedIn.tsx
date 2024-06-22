import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export const NotLoggedIn = () => {
    const { user } = useAuth()

    return (
        user ? <Navigate to={"/blogs"} /> : <Outlet />
    )
}
