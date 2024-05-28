import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Box,
  Tab,
  Tabs,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { buyerActions, sellerActions } from "../store/index";

const Header = () => {

  const location = useLocation();
  const [value, setValue] = useState(0);
  const [isErrorPage, setIsErrorPage] = useState(
    location.pathname === "/error"
  );
  const isBuyerLoggedIn = useSelector((state) => state.buyer.isLoggedIn);
  const isSellerLoggedIn = useSelector((state) => state.seller.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    switch (location.pathname) {
      case "/":
      case "/houses":
        setValue(0);
        break;
      case "/seller":
      case "/buyer-profile":
      case "/seller-profile":
        setValue(1);
        break;
      case "/auth":
      case "/add":
        setValue(2);
        break;
      default:
        setValue(false);
    }
    setIsErrorPage(location.pathname === "/error");
  }, [location.pathname]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const renderTabs = () => {
    const tabs = [
      <Tab
        key="houses"
        to="/houses"
        LinkComponent={NavLink}
        label="Houses"
        disabled={isErrorPage} // Disable the tab if current path is "/error"
      />,
    ];

    if (!isSellerLoggedIn && !isBuyerLoggedIn) {
      tabs.push(
        <Tab
          key="seller"
          to="/seller"
          LinkComponent={NavLink}
          label="Seller"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />,
        <Tab
          key="login"
          to="/auth"
          LinkComponent={NavLink}
          label="Login"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />
      );
    }

    if (isBuyerLoggedIn) {
      tabs.push(
        <Tab
          key="buyer-profile"
          LinkComponent={Link}
          to="/buyer-profile"
          label="Profile"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />,
        <Tab
          key="logout"
          onClick={() => dispatch(buyerActions.logout())}
          LinkComponent={Link}
          to="/"
          label="Logout"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />
      );
    }

    if (isSellerLoggedIn) {
      tabs.push(
        <Tab
          key="seller-profile"
          LinkComponent={Link}
          to="/seller-profile"
          label="Profile"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />,
        <Tab
          key="add-house"
          LinkComponent={Link}
          to="/add"
          label="Add House"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />,
        <Tab
          key="seller-logout"
          onClick={() => dispatch(sellerActions.logout())}
          LinkComponent={Link}
          to="/"
          label="Logout"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />
      );
    }

    return tabs;
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width="20%">
          <Link to="/" style={{ color: "white" }}>
            <HomeIcon />
          </Link>
        </Box>
        <Box width="60%" display="flex" justifyContent="center">
          <Tabs
            onChange={handleTabChange}
            value={value}
            textColor="inherit"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#CB0101", // Change the indicator color to red
              },
            }}
          >
            {renderTabs()}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
