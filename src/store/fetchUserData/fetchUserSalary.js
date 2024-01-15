import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  status: "initialized",
};

export const fetchUserSalary = createAsyncThunk(
  "fetchUserSalary",
  async ({ auth, database }) => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userRef = database.ref(`users/${currentUser.uid}/salary/`);

        // Fetch user data from the Realtime Database asynchronously
        const snapshot = await userRef.once("value");
        const data = snapshot.val();

        const loadedSalary = [];
        for (const key in data) {
          for (const innerKey in data[key]) {
            loadedSalary.push({
              name: data[key][innerKey].name,
              expenses: data[key][innerKey].expenses,
              id: data[key][innerKey].id,
            });
          }
        }

        return loadedSalary;
      } else {
        // If no user is signed in, set user data state to null
        console.log("Not fetch data");
      }

      // Set loading to false once the data is fetched
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      throw error;
    }
  }
);

const fetchUserSalarySlice = createSlice({
  name: "fetchUserSalary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserSalary.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(fetchUserSalary.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchUserSalary.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.status = "error";
    });
  },
});

export const fetchUserSalaryActions = fetchUserSalarySlice.actions;
export default fetchUserSalarySlice.reducer;
