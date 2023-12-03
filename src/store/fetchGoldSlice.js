import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    contents: [],
  isLoading: false,
  error: null,
};

export const fetchContent = createAsyncThunk(
  "fetchContent",
  async () => {
    const res = await fetch("http://api.nbp.pl/api/exchangerates/tables/B");
    const data = await res.json();
    console.log('Zloto')
    console.log(data)
    return data[0];
  }
);

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
