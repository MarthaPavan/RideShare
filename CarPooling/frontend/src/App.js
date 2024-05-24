import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./components/Home";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons";
import Login from "./components/Login";
import Footer from "./Footer";
import About from "./components/About";
import GetStarted from "./components/GetStarted";
import CreateAccount from "./components/PassengerSignUp";
import JoinUs from "./components/JoinUs";
import SignUpSuccess from "./components/SignUpSuccess";
const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/GetStarted" element={<GetStarted />} />
        <Route exact path="/create-account" element={<CreateAccount />} />
        <Route exact path="/join" element={<JoinUs />} />
        <Route exact path="/SignUpSuccess" element={<SignUpSuccess />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
