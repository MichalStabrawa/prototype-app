import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  contents: [],
  isLoading: false,
  error: null,
};

export const fetchContent = createAsyncThunk("fetchContent", async () => {
  try {
    const res = await fetch("http://api.nbp.pl/api/exchangerates/tables/B/");
    if (!res.ok) {
      throw new Error("Somthing went wrong");
    }
    const data = await res.json();

    return data[0];
  } catch (error) {
    console.log(error);
  }
});

const fetchGoldSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContent.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload;
    });
    builder.addCase(fetchContent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const fetchGoldActions = fetchGoldSlice.actions;

export default fetchGoldSlice.reducer;
