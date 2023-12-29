import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  status: "initialized",
};

export const fetchNbpTableC = createAsyncThunk("fetchNbpTableC", async () => {
  try {
    const response = await fetch(
      "http://api.nbp.pl/api/exchangerates/tables/c/"
    );
    if (!response.ok) {
      throw new Error("Somthing went wrong table C");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    initialState.status = "error";
  }
});

const fetchNbpTableCSlice = createSlice({
  name: "tableC",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNbpTableC.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(fetchNbpTableC.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchNbpTableC.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.status = "error";
    });
  },
});
export const fetchNbpTableCActions = fetchNbpTableCSlice.actions;

export default fetchNbpTableCSlice.reducer;
