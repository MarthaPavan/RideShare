import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

const SignUpSuccess = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Login");
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center ">
        <h1 className="fw-bold">Account created successfully</h1>
        <button className="btn btn-primary" onClick={handleClick}>
          Login Here
        </button>
      </div>
    </div>
  );
};

export default SignUpSuccess;
