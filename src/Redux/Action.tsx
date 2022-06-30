import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlayerList = createAsyncThunk(
    "team/playerListLoading",

    async () => {

      const fetchData = await axios({
        method: 'GET',
  url: 'https://kue-balok-amazon-scraper.p.rapidapi.com/search/rolexWatch',
  params: {api_key: '3ce665bfa50b336b23f980a1ab4d0753'},
  headers: {
    'X-RapidAPI-Key': 'a08b46e4f2msh25a8dc2a3d14f2fp17daeajsna7b2bc642d72',
    'X-RapidAPI-Host': 'kue-balok-amazon-scraper.p.rapidapi.com'
  }
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
  