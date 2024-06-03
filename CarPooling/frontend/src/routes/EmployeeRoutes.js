import { Navigate, Outlet } from "react-router-dom";


const EmployeeRoutes = () => {
    //const { user } = useAuth();
    const user = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if(user===null){
        <Navigate to={"/Login"}/>
    }
    if (user && role === "driver") {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
};

export default EmployeeRoutes;
