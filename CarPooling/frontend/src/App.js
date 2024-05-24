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
const App = () => {
  const [status, setStatus] = useState(false);
  return (
    <Router>
      <NavBar status={status} setStatus={setStatus} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/GetStarted" element={<GetStarted />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
