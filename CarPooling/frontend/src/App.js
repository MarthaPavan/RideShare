import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./components/Home";
import Login from "./components/Login";
import Footer from "./Footer";
import { useState } from "react";
import About from "./components/About";
import GetStarted from "./components/GetStarted";
import ForgotPassword from "./components/ForgotPassword";
import CreateAccount from "./components/CreateAccount";
import SignUpSuccess from "./components/SignUpSuccess";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons";
import AdminDashBoard from "./components/AdminDashBoard";
import EmployeeDashBoard from "./components/EmployeeDashBoard";
import UserDashBoard from "./components/UserDashBoard";

import JoinUs from "./components/JoinUs";
const App = () => {
  const [status, setStatus] = useState(false);
  return (
    <Router>
      <NavBar status={status} setStatus={setStatus} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/About" element={<About />} />
        <Route
          exact
          path="/Login"
          element={<Login status={status} setStatus={setStatus} />}
        />
        <Route exact path="/GetStarted" element={<GetStarted />} />
        <Route exact path="/Forgot" element={<ForgotPassword />} />
        <Route exact path="/create-account" element={<CreateAccount />} />
        <Route exact path="/SignUpSuccess" element={<SignUpSuccess />} />
        <Route exact path="/AdminDashBoard" element={<AdminDashBoard />} />
        <Route
          exact
          path="/EmployeeDashBoard"
          element={<EmployeeDashBoard />}
        />
        <Route exact path="/UserDashBoard" element={<UserDashBoard />} />
        <Route exact path="/join" element={<JoinUs />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
