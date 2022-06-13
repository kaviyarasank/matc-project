import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlayerList = createAsyncThunk(
    "team/playerListLoading",

    async () => {

      const fetchData = await axios({
        method: 'GET',
        url: 'https://jsmamazonindiadatascraper.p.rapidapi.com/search/watch',
        params: {api_key: '557ba6684cf3492fca6cc209f42f6950'},
        headers: {
          'X-RapidAPI-Key': 'a08b46e4f2msh25a8dc2a3d14f2fp17daeajsna7b2bc642d72',
          'X-RapidAPI-Host': 'jsmamazonindiadatascraper.p.rapidapi.com'
        }
      }).then((response) => {
        if (response.status !== 200) {
          console.error("no fetched data");
  
          return {};
        } else {
          const message = "Success, fetched data";
          const style =
            "color: green; background: #f0ffec; display: block; margin: 0px; padding: 0px;";
          console.log("%c" + message, style);
  
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
  