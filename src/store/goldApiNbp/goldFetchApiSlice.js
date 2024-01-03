import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  status: "initialized",
};

const url = "http://api.nbp.pl/api/cenyzlota/last/2";

export const goldFetch = createAsyncThunk("goldFetch", async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Something went wrong with get: ${url}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});

const goldFetchSlice = createSlice({
  name: "goldFetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(goldFetch.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(goldFetch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(goldFetch.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.status = "error";
    });
  },
});

export const goldFetchActions = goldFetchSlice.actions;
export default goldFetchSlice.reducer;
