import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/HomePage";
import Houses from "./components/Houses/Houses"; // Updated import
import Seller from "./components/Auth/Seller"; // Updated import
import Auth from "./components/Auth/Auth";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store";
import Interest from "./components/Interests/Interest"; // Updated import
import BuyerProfile from "./Profiles/BuyerProfile"; // Updated import
import SellerProfile from "./Profiles/SellerProfile"; // Updated import
import AddHouse from "./components/Houses/AddHouse"; // Updated import
import ErrorPage from "./components/ErrorPage";
import ProtectedRoute from "./components/ProtectedRoute";

axios.defaults.baseURL = "http://localhost:5000";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/houses", element: <Houses /> }, // Updated route
      { path: "/seller", element: <Seller /> }, // Updated route
      { path: "/add", element: <ProtectedRoute requireSeller={true}><AddHouse /></ProtectedRoute> }, // Updated route and component
      { path: "/auth", element: <Auth /> },
      { path: "/interest/:id", element: <ProtectedRoute><Interest /></ProtectedRoute> }, // Updated route and component
      { path: "/buyer-profile", element: <ProtectedRoute><BuyerProfile /></ProtectedRoute> }, // Updated route and component
      { path: "/seller-profile", element: <ProtectedRoute requireSeller={true}><SellerProfile /></ProtectedRoute> }, // Updated route and component
      { path: "/error", element: <ErrorPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
