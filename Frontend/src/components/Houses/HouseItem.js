import {
  Card,
  Typography,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const MovieItem = ({ area, bedroom, bathroom, houseUrl, hospitalNearby, location, id }) => {
  return (
    <Card
      sx={{
        margin: 2,
        width: 250,
        height: 420,
        borderRadius: 5,
        "&:hover": { boxShadow: "10px 10px 20px #ccc" },
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding:2
      }}
    >
      <img
        src={houseUrl}
        alt={"house"}
        style={{
          width: "100%",
          height: "50%",
          objectFit: "cover",
        }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {area}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bedroom} Bedrooms
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {bathroom} Bathrooms {/* replaced 'releaseDate' with 'bedroom' and 'bathroom' */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Nearby Hospital - {hospitalNearby}  {/* replaced 'releaseDate' with 'bedroom' and 'bathroom' */}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Location - {location}  {/* replaced 'releaseDate' with 'bedroom' and 'bathroom' */}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={`/interest/${id}`}
          sx={{ margin: "auto" }}
          size="small"
          variant="contained"
          fullWidth
        >
          I'm Interested
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
