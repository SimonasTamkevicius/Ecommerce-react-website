import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const loggedIn = false;

    return loggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default ProtectedRoutes;