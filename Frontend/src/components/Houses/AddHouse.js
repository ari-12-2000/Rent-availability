import {
  Box,
  Button,

  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { addHouse } from "../../api-helpers/api-helpers"; // corrected import statement
import { useNavigate } from "react-router-dom";
import { fetchHouses } from "../../store";
import { useDispatch } from "react-redux";

const labelProps = {
  mt: 1,
  mb: 1,
};

const AddHouse = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    area: "", // replaced 'title' with 'area'
    bedroom: "", // replaced 'description' with 'bedroom'
    bathroom: "", // replaced 'posterUrl' with 'bathroom'
    houseUrl: "", // replaced 'releaseDate' with 'houseUrl'
    hospitalNearby:"",
    location:"",
  });
  const [error, setError] = useState('')
  const navigate=useNavigate();
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    addHouse(inputs) // changed function name to 'addHouse' and removed actors
      .then((res) => {console.log(res); navigate("/"); dispatch(fetchHouses());})
      .catch((err) => setError("Unable To Add"));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          padding={10}
          margin="auto"
          display={"flex"}
          flexDirection="column"
          boxShadow={"10px 10px 20px #ccc"}
        >
          <Typography textAlign={"center"} variant="h5" fontFamily={"verdana"}>
            Add New House
          </Typography>
          <FormLabel sx={labelProps}>Area</FormLabel>{" "}
          {/* replaced 'Title' with 'Area' */}
          <TextField
            value={inputs.area} // replaced 'title' with 'area'
            onChange={handleChange}
            name="area"
            variant="standard"
            margin="normal"
            placeholder="Please enter in (area)sq.ft format eg:1200 sq.ft"
          />
          <FormLabel sx={labelProps}>Bedroom</FormLabel>{" "}
          {/* replaced 'Description' with 'Bedroom' */}
          <TextField
            value={inputs.bedroom} // replaced 'description' with 'bedroom'
            onChange={handleChange}
            name="bedroom"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>Bathroom</FormLabel>{" "}
          {/* replaced 'Poster URL' with 'Bathroom' */}
          <TextField
            value={inputs.bathroom} // replaced 'posterUrl' with 'bathroom'
            onChange={handleChange}
            name="bathroom"
            variant="standard"
            margin="normal"
          />
          <FormLabel sx={labelProps}>House URL</FormLabel>{" "}
          {/* replaced 'Release Date' with 'House URL' */}
          <TextField
            value={inputs.houseUrl} // replaced 'releaseDate' with 'houseUrl'
            onChange={handleChange}
            name="houseUrl"
            variant="standard"
            margin="normal"

          />
            <FormLabel sx={labelProps}>Nearby Hospital</FormLabel>
                   <TextField
            value={inputs.hospitalNearby} // replaced 'releaseDate' with 'houseUrl'
            onChange={handleChange}
            name="hospitalNearby"
            variant="standard"
            margin="normal"
          />

<FormLabel sx={labelProps}>Location</FormLabel>
                   <TextField
            value={inputs.location} // replaced 'releaseDate' with 'houseUrl'
            onChange={handleChange}
            name="location"
            variant="standard"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: "auto",
              bgcolor: "#2b2d42",
              ":hover": {
                bgcolor: "#121217",
              },
            }}
          >
            Add New House {/* changed button text to 'Add New House' */}
          </Button>
          {error && (
            <Typography variant="h6" textAlign={"center"} color="error">
              {error}
            </Typography>
          )}
        </Box>
      </form>
    </div>
  );
};

export default AddHouse; // corrected export statement
