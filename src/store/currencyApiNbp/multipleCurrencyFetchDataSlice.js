import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const urlUSA = 'https://api.nbp.pl/api/exchangerates/rates/c/usd/last/10';
const initialState = {
    data: [{ name: "", value: "", code: "" }],
    isLoading: false,
    error: null,
    status: "initialized",
  };

  export const multipleCurrencyFetchData = createAsyncThunk("fetchMultipleCurrency",async()=> {
    try {
        // Promise.all() lets us coalesce multiple promises into a single super-promise
        const data = await Promise.all([
       
          fetch(urlUSA).then((response) => response.json()),// parse each response as json
          fetch('https://api.nbp.pl/api/exchangerates/rates/c/eur/last/10').then((response) => response.json()),
          fetch('https://api.nbp.pl/api/exchangerates/rates/c/gbp/last/10').then((response) => response.json())
        ]);
  
        for (const i of data) {
          console.log(`RESPONSE ITEM \n`);
          for (var obj of i) {
            console.log(obj);
          
            console.log(obj);
          }
        }

        return data
  
      } catch (error) {
        console.log(error);
      }
  })

  const multipleCurrencyFetchDataSlice = createSlice({
    name:'multipleCurrencylast',
    initialState,
    reducers:{},
    extraReducers:(builder)=> {
        builder.addCase(multipleCurrencyFetchData.pending,(state)=>{
            state.isLoading=true
        });
        builder.addCase(multipleCurrencyFetchData.fulfilled,(state,action)=> {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(multipleCurrencyFetchData.rejected,(state,action)=> {
            state.isLoading = false;
            state.error = action.error.message
        })
    }
  })

  export const multipleCurrencyDataLastActions = multipleCurrencyFetchDataSlice;
  export default multipleCurrencyFetchDataSlice.reducer;