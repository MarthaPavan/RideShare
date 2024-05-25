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
import AdminDashBoard from "./components/AdminDashBoard";
import EmployeeDashBoard from "./components/EmployeeDashBoard";
import UserDashBoard from "./components/UserDashBoard";
import JoinUs from "./components/JoinUs";
import { AuthProvider } from "./routes/AuthContext";
import AdminRoutes from "./routes/AdminRoutes";
import EmployeeRoutes from "./routes/EmployeeRoutes";
import UserRoutes from "./routes/UserRoutes";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import '@coreui/coreui/dist/css/coreui.min.css'
import '@coreui/icons-react';
import '@coreui/icons';
import '@coreui/react-chartjs';
import { Navigate } from "react-router-dom";

const App = () => {
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

          {/* Temporary admin route to develop dashboard */}
          <Route path="/AdminDashBoard" element={<AdminDashBoard />} />
          {/* Protected Admin Routes */}
          <Route element={<AdminRoutes />}>

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
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
