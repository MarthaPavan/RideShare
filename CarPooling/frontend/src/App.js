import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./Footer";
import About from "./components/About";
import GetStarted from "./components/GetStarted";
import ForgotPassword from "./components/ForgotPassword";
import CreateAccount from "./components/CreateAccount";
import SignUpSuccess from "./components/SignUpSuccess";
import AdminDashBoard from "./components/admindashboard/AdminDashBoard";
import EmployeeDashBoard from "./components/employeedashboard/EmployeeDashBoard";
import UserDashBoard from "./components/userdashboard/UserDashBoard";
import JoinUs from "./components/JoinUs";
import { AuthProvider } from "./routes/AuthContext";
import AdminRoutes from "./routes/AdminRoutes";
import EmployeeRoutes from "./routes/EmployeeRoutes";
import UserRoutes from "./routes/UserRoutes";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/icons-react";
import "@coreui/icons";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const App = () => {

    const token = localStorage.getItem("token");

  return (
    <AuthProvider>
      <Router>
        <NavBar />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/GetStarted" element={<GetStarted />} />
          <Route path="/Forgot" element={<ForgotPassword />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/SignUpSuccess" element={<SignUpSuccess />} />
          <Route path="/join" element={<JoinUs />} />
          
          {/* Protected Admin Routes */}
          <Route element={<AdminRoutes />}>
            <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
          </Route>

          {/* Protected Employee Routes */}
          <Route element={<EmployeeRoutes />}>
            <Route path="/EmployeeDashBoard" element={<EmployeeDashBoard />} />
          </Route>

          {/* Protected User Routes */}
          <Route element={<UserRoutes />}>
            <Route path="/UserDashBoard" element={<UserDashBoard />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Toaster
        containerStyle={{
          top: 80,
          right: 20,
          bottom: 20,
          left: 20,
        }}
        toastOptions={{
          style: {
            height: "60px",
            width: "200px",
            fontFamily: "Inter sans-serif",
            fontWeight: "bold",
          },
        }}
      />
      {!token&&<Footer />}
      </Router>
    </AuthProvider>
  );
};

export default App;
