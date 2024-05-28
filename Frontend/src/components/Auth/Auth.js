import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendBuyerAuthRequest } from "../../api-helpers/api-helpers";
import { buyerActions } from "../../store";
import AuthForm from "./AuthForm";

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  const onResReceived = (data) => {
    
    dispatch(buyerActions.login());
    localStorage.setItem("buyerId", data.id);
    navigate("/");
  };
  const getData = (data) => {
  
    sendBuyerAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch(()=>data.signup
        ? setError("Invalid credentials or credentials already in use")
        : setError("Invalid credentials"));
  };

  return (
    <div>
      <AuthForm onSubmit={getData} error={error}  />
    </div>
  );
};

export default Auth;
