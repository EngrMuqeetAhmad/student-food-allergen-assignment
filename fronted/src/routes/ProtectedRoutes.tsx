import type { ReactNode } from "react"
import { useAppSelector } from "../store/hooks"
import { Navigate } from "react-router"

export const ProtectedRoutes = ({ children }: { children: ReactNode }) => {

    const token = useAppSelector(state => state.auth.token)

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children
}