import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlayerList = createAsyncThunk(
    "team/playerListLoading",

    async () => {

      const fetchData = await axios({
        method: 'GET',
        url: 'https://wolf-amazon-data-scraper.p.rapidapi.com/search/rolexwatch',
        params: {api_key: '59ef84be287bba26357f5519b0058332'},
        headers: {
          'X-RapidAPI-Host': 'wolf-amazon-data-scraper.p.rapidapi.com',
          'X-RapidAPI-Key': 'a08b46e4f2msh25a8dc2a3d14f2fp17daeajsna7b2bc642d72'
        }
      }).then((response) => {
        if (response.status !== 200) {
          // Console error message
          console.error(":( Error, no fetched data");
  
          return {};
        } else {
          // Console success message
          const message = ":) Success, fetched data";
          const style =
            "color: green; background: #f0ffec; display: block; margin: 0px; padding: 0px;";
          console.log("%c" + message, style);
  
          return response.data;
        }
      });
  
      return fetchData;
    }
  );
  
//   export const fetchLatest =createAsyncThunk(
//     "team/playerListLoading",

//     async () => {

//       const fetchData = await axios({
//         method: 'GET',
//         url: 'https://amazon-product-scrapper.p.rapidapi.com/search/PatekPhilippe',
//         params: {api_key: '977c36656438366bf9d34cc870f99c22'},
//         headers: {
//           'X-RapidAPI-Host': 'amazon-product-scrapper.p.rapidapi.com',
//           'X-RapidAPI-Key': 'a08b46e4f2msh25a8dc2a3d14f2fp17daeajsna7b2bc642d72'
//         }
//       }).then((response) => {
//         if (response.status !== 200) {
//           // Console error message
//           console.error(":( Error, no fetched data");
  
//           return {};
//         } else {
//           // Console success message
//           const message = ":) Success, fetched data";
//           const style =
//             "color: green; background: #f0ffec; display: block; margin: 0px; padding: 0px;";
//           console.log("%c" + message, style);
  
//           return response.data;
//         }
//       });
  
//       return fetchData;
//     }
//   );
  // Initial state
  const teamInitialState = {
    playerList: {
      status: "idle",
      data: {},
      error: {}
    }
  };
  
  // Reducers
  const teamSlice = createSlice({
    name: "team",
    initialState: teamInitialState,
    // Non-async reducers
    reducers: {},
    // Async reducers
    extraReducers: {
      
      [fetchPlayerList.fulfilled.type]: (state, action) => {
        console.log("straoo",state)
        state.playerList = {
          status: "success",
          data: action.payload,
          error: {}
        };
      },
  
    }
  });
  
  export default teamSlice.reducer;
  