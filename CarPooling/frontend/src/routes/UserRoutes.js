import { Navigate, Outlet } from "react-router-dom";


const UserRoutes = () => {
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if(!user.token){
        <Navigate to={"/Login"}/>
    }
    if (user && role === "user") {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default UserRoutes;
