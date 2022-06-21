import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postLogin = createAsyncThunk(
    "team/playerListLoading",

    async (data:any) => {
console.log("dataggggggg",data)
      const postData = await axios({
        method: 'POST',
        url: 'http://localhost:3002/login',data

      }).then((res) => {
      console.log("rrrrrrrr",res)
      localStorage.setItem("token", JSON.stringify(res?.data));
      });
      return postData;
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
  const loginReducer = createSlice({
    name: "login",
    initialState: teamInitialState,
    // Non-async reducers
    reducers: {},
    // Async reducers
    extraReducers: {
      
      [postLogin.fulfilled.type]: (state, action) => {
        console.log("straiiiioo",action.meta.arg)
        state.playerList = {
          status: "success",
          data: action.meta.arg,
          error: {}
        };
      },
  
    }
  });
  
  export default loginReducer.reducer;
  