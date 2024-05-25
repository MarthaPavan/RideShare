import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const UserRoutes = () => {
    const { user } = useAuth();
    if(!user.token){
        <Navigate to={"/Login"}/>
    }
    if (user && user.role === "driver") {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default UserRoutes;
