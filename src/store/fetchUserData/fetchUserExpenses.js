import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  isLoading: false,
  error: null,
  status: "initialized",
};

export const fetchUserExpenses = createAsyncThunk(
  "fetchUserExperience",
  async ({ auth, database }) => {
    try {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userRef = database.ref(`users/${currentUser.uid}/expenses/`);

        // Fetch user data from the Realtime Database asynchronously
        const snapshot = await userRef.once("value");
        const data = snapshot.val();

        const loadedSalary = [];
        for (const key in data) {
          for (const innerKey in data[key]) {
            loadedSalary.push({
              name: data[key][innerKey].name,
              expenses: data[key][innerKey].expenses,
              category: data[key][innerKey].category,
              id: data[key][innerKey].id,
              fullDate: data[key][innerKey].fullDate,
              monthYear: data[key][innerKey].monthYear,
              deadline: data[key][innerKey].deadline
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

const fetchUserExpensesSlice = createSlice({
  name: "fetchUserExpenses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserExpenses.pending, (state) => {
      state.isLoading = true;
      state.status = "pending";
    });
    builder.addCase(fetchUserExpenses.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchUserExpenses.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
      state.status = "error";
    });
  },
});

export const fetchUserExpensesActions = fetchUserExpensesSlice.actions;
export default fetchUserExpensesSlice.reducer;