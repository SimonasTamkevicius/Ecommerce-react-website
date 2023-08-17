import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoutesUser = () => {
    const { user } = useAuth();
    
    return user.loggedIn === "Admin" ? <Outlet /> : <Navigate to="/UserProfile" />
}

export default ProtectedRoutesUser;