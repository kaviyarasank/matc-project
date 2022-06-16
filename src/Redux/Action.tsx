import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPlayerList = createAsyncThunk(
    "team/playerListLoading",

    async () => {

      const fetchData = await axios({
        method: 'GET',
        url: 'https://my-amazon-data-parser1.p.rapidapi.com/search/rolexWatch',
        params: {api_key: 'fa41c7877ce0de3b5a12da617bc8e8c2'},

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
  