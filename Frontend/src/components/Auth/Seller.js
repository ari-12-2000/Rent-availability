import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendSellerAuthRequest } from "../../api-helpers/api-helpers";
import { sellerActions } from "../../store";
import AuthForm from "./AuthForm";


const Seller = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  const onResReceived = (data) => {
    console.log(data)
    dispatch(sellerActions.login());
    localStorage.setItem("sellerId", data.id);  

    navigate("/");
  };
  const getData = (data) => {
    console.log("Seller", data);
    sendSellerAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err)=> {
        console.log(err);
        data.signup
      ? setError("Invalid credentials or credentials already in use")
      : setError("Invalid credentials")});
  };
  return (
    <div>
      <AuthForm onSubmit={getData} error={error}  />
    </div>
  );
};

export default Seller;
