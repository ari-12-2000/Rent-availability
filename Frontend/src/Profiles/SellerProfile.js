import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { getSellerById } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const SellerProfile = () => {
  const [seller, setSeller] = useState();

  useEffect(() => {
    getSellerById()
      .then((res) => {console.log(res.seller);setSeller(res.seller)})
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        {" "}
        {seller && (
          <Box
          display="flex"
            flexDirection={"column"}
            justifyContent="center"
            alignItems={"center"}
            width={"30%"}
            padding={3}
          >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
            />
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email: {seller[0].email}
            </Typography>
          </Box>
        )}
        {seller && seller[0].addedHouses.length > 0 && (
          <Box width={"70%"} display="flex" flexDirection="column">
            <Typography
              variant="h3"
              fontFamily="verdana"
              textAlign="center"
              padding={2}
            >
              Added Houses
            </Typography>
            <Box
              margin="auto"
              display="flex"
              flexDirection="column"
              width="80%"
            >
              <List>
                {seller[0].addedHouses.map((house, index) => (
                  <ListItem
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                    key={index}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      <Typography fontWeight={"bold"} marginTop={1}>
                        Area: {house.area}
                      </Typography>
                      <Typography fontWeight={"bold"} marginTop={1}>
                        Bedrooms: {house.bedroom}
                      </Typography>
                      <Typography fontWeight={"bold"} marginTop={1}>
                        Bathrooms: {house.bathroom}
                      </Typography>
                      <Typography fontWeight={"bold"} marginTop={1}>
                        Location: {house.location}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default SellerProfile;
