import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requireSeller }) => {
  let isBuyerLoggedIn = false,
    isSellerLoggedIn = false;
  const buyerId = localStorage.getItem("buyerId");
  const sellerId = localStorage.getItem("sellerId");
  
  if (buyerId) {
    isBuyerLoggedIn = true;
  } else if (sellerId) {
    isSellerLoggedIn = true;
  }

  if (requireSeller && !isSellerLoggedIn) {
    return <Navigate to="/seller" />; // Updated to reflect the change
  }

  if (!requireSeller && !isBuyerLoggedIn) {
    return <Navigate to="/auth" />;
  }

  return children;
};

export default ProtectedRoute;
