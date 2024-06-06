import { Navigate, Outlet } from "react-router-dom";


const AdminRoutes = () => {
    // const { user } = useAuth();
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if(!user.token){
        <Navigate to={"/Login"}/>
    }
    if (user && role === "admin") {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default AdminRoutes;
