import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlayerList = createAsyncThunk(
    "team/playerListLoading",

    async () => {

      const fetchData = await axios({
        method: 'GET',
  url: 'https://ccc-amazon-scraperapi.p.rapidapi.com/search/rolexWatch',
  params: {api_key: '79687d0f243f12887fb0d5f40ee0e4d9'},

      }).then((response) => {
        if (response.status !== 200) {
          console.error("no fetched data");
  
          return {};
        } else {
  
          return response.data;
        }
      });
  
      return fetchData;
    }
  );
  
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
  