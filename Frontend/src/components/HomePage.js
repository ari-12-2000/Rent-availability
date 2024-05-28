import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import HouseItem from "./Houses/HouseItem"; // Update the component name and path

const HomePage = () => {
  const houses = useSelector((state) => state.houses.houses);
  const status = useSelector((state) => state.houses.status);
  const navigate = useNavigate();

  const isLoading = status === "loading";
  const isError = status === "failed";

  const renderLoader = () => (
    <Box
      padding={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <CircularProgress />
    </Box>
  );

  const renderHouses = () => (
    <Box
      padding={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box width="80%" height="66vh">
        <img
          src="images/house.webp"
          alt="House"
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      <Typography variant="h4" textAlign="center" margin={4}>
        Latest Releases
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        flexWrap="wrap"
        gap={2}
        width="80%"
      >
        {houses &&
          houses.slice(0, 4).map((house, index) => (
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

      <Button
        component={Link}
        to="/houses"
        variant="outlined"
        sx={{ marginTop: 4 }}
      >
        View All Houses
      </Button>
    </Box>
  );

  useEffect(() => {
    if (isError) {
      navigate("/error");
    }
  }, [isError, navigate]);

  return isLoading ? renderLoader() : renderHouses();
};

export default HomePage;
