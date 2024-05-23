import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './components/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons';
import Login from './components/Login';
import Footer from './Footer';
import SignUp from './components/SignUp';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path='/SignUp' element={<SignUp/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
