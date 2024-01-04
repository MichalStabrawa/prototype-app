import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  status: "initialized",
};

export const goldFetchDate = createAsyncThunk("goldFetchDate", async ({ date }) => {
  try {
    const response = await fetch(`http://api.nbp.pl/api/cenyzlota/${date}`);

    if (!response.ok) {
      throw new Error(`Something went wrong with date ${date}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    initialState.status="error"
    console.log(error);
  }
});

const goldFetchDateSlice = createSlice({
  name: "goldFetchDate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(goldFetchDate.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(goldFetchDate.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(goldFetchDate.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.status = "error";
    });
  },
});

export const goldFetchDateActions = goldFetchDateSlice.actions;
export default goldFetchDateSlice.reducer;
