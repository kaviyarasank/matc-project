import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlayerList = createAsyncThunk(
    "team/playerListLoading",

    async () => {

      const fetchData = await axios({
        method: 'GET',
  url: 'https://amazon-data-scraper67.p.rapidapi.com/search/rolexWatch',
  params: {api_key: 'c3aa55e23c2e2a0d775d8e3c0f262b21'},
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
  
  const teamSlice = createSlice({
    name: "team",
    initialState: teamInitialState,
    reducers: {},
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
  