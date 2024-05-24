import React from "react";
import { useNavigate } from "react-router-dom";

const SignUpSuccess = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/Login");
  };

  return (
    <div className="text-center">
      <h1>Account created successfully</h1>
      <p>Click below to login</p>
      <button className="btn btn-primary" onClick={handleClick}>
        Login
      </button>
    </div>
  );
};

export default SignUpSuccess;
