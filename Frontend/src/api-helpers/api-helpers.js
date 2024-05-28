import axios from "axios";

export const getAllHouses = async () => {
  const res = await axios.get("/house").catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }

  const data = await res.data;
  return data;
};

export const sendBuyerAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`/buyer/${signup ? "signup" : "login"}`, {
      firstname: signup ? data.firstname : "",
      lastname: signup ? data.lastname : "",
      phone: signup ? data.phone : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200 && res.status !== 201) {
    console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const sendSellerAuthRequest = async (data, signup) => {
  const res = await axios
    .post(`/seller/${signup ? "signup" : "login"}`, {
      firstname: signup ? data.firstname : "",
      lastname: signup ? data.lastname : "",
      phone: signup ? data.phone : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (!res) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getHouseDetails = async (id) => {

const res = await axios.get(`/house/${id}`).catch((err) => console.log(err));
  if (!res) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  console.log(resData)
  return resData;
};

export const newInterest = async (data) => {
  const res = await axios
    .post("/interest", {
      house: data.house,
     
      buyer: localStorage.getItem("buyerId"),
    })
    .catch((err) => console.log(err));

  if (res.status !== 201) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const getBuyerInterests = async () => {
  const id = localStorage.getItem("buyerId");
  const res = await axios
    .get(`/buyer/interests/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const deleteInterest = async (id) => {
  const res = await axios
    .delete(`/interest/${id}`)
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }

  const resData = await res.data;
  return resData;
};

export const getBuyerDetails = async () => {
  const id = localStorage.getItem("buyerId");
  const res = await axios.get(`/buyer/${id}`).catch((err) => console.log(err));
  if (res.status !== 200) {
    return console.log("Unexpected Error");
  }
  const resData = await res.data;
  return resData;
};

export const addHouse = async (data) => {
  console.log(localStorage.getItem("sellerId"));
  const res = await axios
    .post(
      "/house",
      {
        area: data.area,
        bedroom: data.bedroom,
        bathroom: data.bathroom,
        houseUrl: data.houseUrl,
        hospitalNearby:data.hospitalNearby,
        location:data.location,
        seller: localStorage.getItem("sellerId"),
      }
      
    )
    .catch((err) => console.log(err));

  if (!res) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};

export const getSellerById = async () => {
  const sellerId = localStorage.getItem("sellerId");
  const res = await axios
    .get(`/seller/${sellerId}`)
    .catch((err) => console.log(err));

  if (!res) {
    return console.log("Unexpected Error Occurred");
  }

  const resData = await res.data;
  return resData;
};
