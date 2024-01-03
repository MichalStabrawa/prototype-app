import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  status: "initialized",
};

export const goldFetchTopLastCount = createAsyncThunk(
  "goldFetchTopLastCount",
  async ({ number }) => {
    try {
      const response = await fetch(
        `http://api.nbp.pl/api/cenyzlota/last/${number}/`
      );

      if (!response.ok) {
        throw new Error(`Something went wrong with ${number}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      initialState.status = "rejected";
      console.log(error);
    }
  }
);

const goldFetchTopLastSlice = createSlice({
  name: "goldFetchTopLast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(goldFetchTopLastCount.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(goldFetchTopLastCount.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(goldFetchTopLastCount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.status = "rejected";
    });
  },
});

export const goldFetchTopLastAction = goldFetchTopLastSlice.actions;
export default goldFetchTopLastSlice.reducer;
