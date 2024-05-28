import React, { useEffect, useState } from "react";
import { Typography, Grid, Paper, CircularProgress, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useParams, useNavigate } from "react-router-dom";
import { getHouseDetails, newInterest } from "../../api-helpers/api-helpers";

const Interest = () => {
  const [house, setHouse] = useState(null);
  const [Loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();



  useEffect(() => {
    getHouseDetails(id)
      .then((res) => {
         console.log(res.house);
        setHouse(res.house);
        setLoading(false);
      })
      .catch(() => {
        navigate("/error");
      });
  }, [id,navigate]);

  const handleSubmit=()=>{
    newInterest({ house: house[0]._id })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
       
      });
  }

  return Loading ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress />
    </Box>
  ) : (
    <Box padding={2}>
      {house &&
       
          <>
            <Typography
           
              padding={3}
              fontFamily="fantasy"
              variant="h4"
              textAlign="center"
            >
              Express Interest For House
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} md={6}>
                <Paper elevation={3}>
                  <img
                    src={house[0].houseUrl}
                    alt={'House'}
                    style={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "70vh",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <Box padding={2}>
                    <Typography>Area: {house[0].area}</Typography>
                    <Typography fontWeight={"bold"} marginTop={1}>
                      Bathrooms: {house[0].bathroom}
                    </Typography>
                    <Typography fontWeight={"bold"} marginTop={1}>
                      Bedrooms: {house[0].bedroom}
                    </Typography>
                    <Typography fontWeight={"bold"} marginTop={1}>
                      Location: {house[0].location}
                    </Typography>
                    <Typography fontWeight={"bold"} marginTop={1}>
                      Nearby Hospital: {house[0].hospitalNearby}
                    </Typography>
                    <Typography fontWeight={"bold"} marginTop={1}>
                      Seller Phone Number: {house[0].seller.phone}
                    </Typography>
                    <Button
                      
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={handleSubmit}
                    >
                      ADD TO PROFILE 
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </>
      }
    </Box>
  );
};

export default Interest;
