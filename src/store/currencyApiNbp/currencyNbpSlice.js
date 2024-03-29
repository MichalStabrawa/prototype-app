import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  status: 'initialized'
};

export const fetchNbpTableA = createAsyncThunk(
  "fetchNbpTableA",
  async (table) => {
    try {
      const response = await fetch(
        `http://api.nbp.pl/api/exchangerates/tables/${table}/last/2/`
      );
      if (!response.ok) {
        throw new Error("Somthing went wrong");
      }
      const data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
      initialState.status = 'error'
    }
  }
);

const fetchNbpTableASlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNbpTableA.pending, (state) => {
      state.isLoading = true;
      state.status='pending'
    });
    builder.addCase(fetchNbpTableA.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = 'success'
    });
    builder.addCase(fetchNbpTableA.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.status = 'error'
    });
  },
});

export const fetchNbpTableAactions = fetchNbpTableASlice.actions;
export default fetchNbpTableASlice.reducer;
