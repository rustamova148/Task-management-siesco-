import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../redux/app/store"

const ProtectedRoute = () => {
const user = useSelector((state: RootState) => state.user.currentUser);
    if(!user) {
        return <Navigate to="/signin" replace />
    }

    return <Outlet />
}

export default ProtectedRoute