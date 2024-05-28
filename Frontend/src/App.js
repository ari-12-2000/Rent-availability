import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sellerActions, fetchHouses, buyerActions } from "./store";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.getItem("buyerId")) {
      dispatch(buyerActions.login());
    } else if (localStorage.getItem("sellerId")) {
      dispatch(sellerActions.login());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);
  
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
