import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const AdminRoutes = () => {
    const { user } = useAuth();
    if(!user.token){
        <Navigate to={"/Login"}/>
    }
    if (user && user.role === "admin") {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default AdminRoutes;
