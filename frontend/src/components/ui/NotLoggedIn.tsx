import { Navigate, Outlet } from 'react-router-dom'

export const NotLoggedIn = () => {
    const token = localStorage.getItem("token")

    return (
        token ? <Navigate to={"/blogs"} /> : <Outlet />
    )
}
