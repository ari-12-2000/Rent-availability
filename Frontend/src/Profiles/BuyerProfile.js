import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import {
  deleteInterest,
  getBuyerInterests,
  getBuyerDetails,
} from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const UserProfile = () => {
  const [interests, setInterests] = useState();
  const [buyer, setBuyer] = useState();
  useEffect(() => {
    getBuyerInterests()
      .then((res) =>{console.log(res.interest); setInterests(res.interest)})
      .catch((err) => console.log(err));

    getBuyerDetails()
      .then((res) => setBuyer(res.buyer))
      .catch((err) => console.log(err));
  }, []);
  const handleDelete = (id,index) => {
    deleteInterest(id)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      setInterests(interests.filter((_, i) => i !== index));   
  };
  return (
    <Box
    display="flex"
    flexDirection={{ xs: "column", md: "row" }}
    width="100%"
  >
      <Fragment>
        {" "}
        {buyer && (
          <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width={{ xs: "100%", md: "30%" }}
          padding={3}
        >
            <AccountCircleIcon
              sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
            />
            <Typography
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              First Name: {buyer.firstname}
            </Typography>
            <Typography
             mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Last Name: {buyer.lastname}
            </Typography>
            <Typography
              mt={1}
              padding={1}
              width={"auto"}
              textAlign={"center"}
              border={"1px solid #ccc"}
              borderRadius={6}
            >
              Email: {buyer.email}
            </Typography>
          </Box>
        )}
        {interests && (
          <Box
          width={{ xs: "100%", md: "70%" }}
          display="flex"
          flexDirection="column"
          padding={3}
        >
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
            >
              Interests
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {interests.map((interest,index) => (
                  <ListItem
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Area: {interest.house.area}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Bedrooms: {interest.house.bedroom}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Bathrooms: {interest.house.bathroom}
                    </ListItemText>
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Hospitals: {interest.house.hospitalNearby}
                    </ListItemText>

                    <IconButton
                      onClick={() => handleDelete(interest._id,index)}
                      color="error"
                    >
                      <DeleteForeverIcon />
                    </IconButton>
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

export default UserProfile;
