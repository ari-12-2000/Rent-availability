import React, { useEffect, useState, useCallback } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash'; // Import lodash for debounce functionality
import { buyerActions, sellerActions } from "../store/index";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(0);
  const [isErrorPage, setIsErrorPage] = useState(location.pathname === "/error");
  const isBuyerLoggedIn = useSelector((state) => state.buyer.isLoggedIn);
  const isSellerLoggedIn = useSelector((state) => state.seller.isLoggedIn);
  const dispatch = useDispatch();

  const houses = useSelector((state) => state.houses.houses);

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
        setValue(2);
      case "/add":
        setValue(3);
        break;
      default:
        setValue(false);
    }
    setIsErrorPage(location.pathname === "/error");
  }, [location.pathname]);

  const handleHouseSelect = useCallback(
    _.debounce((val) => {
      const house = houses.find((hse) => hse.title === val);

      if (isBuyerLoggedIn) {
        if (house) navigate(`/interest/${house._id}`);
        else navigate("/error");
      } else navigate("/auth");
    }, 300),
    [houses, isBuyerLoggedIn, navigate]
  );

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
          key="seller-logout"
          onClick={() => dispatch(sellerActions.logout())}
          LinkComponent={Link}
          to="/"
          label="Logout"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />,
          <Tab
          key="add-house"
          LinkComponent={Link}
          to="/add"
          label="Add House"
          disabled={isErrorPage} // Disable the tab if current path is "/error"
        />

        
      );
    }

    return tabs;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleHouseSelect(e.target.value);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width="20%">
          <Link to="/" style={{ color: "white" }}>
            <HomeIcon />
          </Link>
        </Box>
        <Box width="50%" marginRight="auto" marginLeft="auto">
          <Autocomplete
            onChange={(e, val) => handleHouseSelect(val)}
            sx={{
              borderRadius: 10,
              width: "40%",
              margin: "auto",
              pointerEvents: isErrorPage ? "none" : "auto", // Disable the search box if current path is "/error"
            }}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={houses.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{
                  borderRadius: 2,
                  input: { color: "white" },
                  bgcolor: "#2b2d42",
                  padding: "6px",
                }}
                variant="standard"
                placeholder="Search Across Multiple Houses"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  type: "search",
                }}
                onKeyDown={handleKeyDown}
                disabled={isErrorPage} // Disable the search box if current path is "/error"
              />
            )}
          />
        </Box>
        <Box display="flex">
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
