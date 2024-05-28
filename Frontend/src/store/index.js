import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllHouses } from "../api-helpers/api-helpers"; // Update the function name and import path if necessary

export const fetchHouses = createAsyncThunk("houses/fetchHouses", async () => {
  const response = await getAllHouses(); // Update the function name
  console.log(response)
  return response.houses;
});

const buyerSlice = createSlice({
  name: "buyer",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("buyerId");
      state.isLoggedIn = false;
    },
  },
});

const sellerSlice = createSlice({
  name: "auth",
  initialState: { isLoggedIn: false },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      localStorage.removeItem("sellerId");
      localStorage.removeItem("token");
      state.isLoggedIn = false;
    },
  },
});

const housesSlice = createSlice({
  name: "houses",
  initialState: {
    houses: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHouses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHouses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.houses = action.payload;
      })
      .addCase(fetchHouses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const buyerActions = buyerSlice.actions;
export const sellerActions = sellerSlice.actions;

export const store = configureStore({
  reducer: {
    buyer: buyerSlice.reducer,
    seller: sellerSlice.reducer,
    houses: housesSlice.reducer
  },
});
