import React, { useEffect } from 'react';
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HouseItem from "./HouseItem"; // Update the component name
import { useSelector } from "react-redux";

const Houses = () => {
  const navigate = useNavigate();
  const houses = useSelector((state) => state.houses.houses);
  const status = useSelector((state) => state.houses.status);

  useEffect(() => {
    if (status === 'failed') {
      navigate('/error');
    }
  }, [status, navigate]);

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box margin={"auto"} padding={2}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Houses
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
      >
        {houses &&
          houses.map((house, index) => (
            <HouseItem
              key={index}
              id={house._id}
              area={house.area} 
              hospitalNearby={house.hospitalNearby} 
              houseUrl={house.houseUrl} 
              bedroom={house.bedroom}
              bathroom={house.bathroom}
              location={house.location}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Houses;
