import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoutes = () => {
    const { user } = useAuth();
    
    return user.loggedIn && user.role === "Admin" ? <Outlet /> : <Navigate to="/UserProfile" />
}

export default ProtectedRoutes;