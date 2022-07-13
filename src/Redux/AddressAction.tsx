import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postAddress = createAsyncThunk(
  'address',

  async (data: any) => {
    const postData = await axios({
      method: 'POST',
      url: 'http://localhost:8080/address',
      data
    }).then((res) => {
     console.log("postProduct",res)
    });
    return postData;
  }
);

const teamInitialState = {
  playerList: {
    status: 'idle',
    data: {},
    error: {}
  }
};

const addressReducer = createSlice({
  name: 'address',
  initialState: teamInitialState,
  reducers: {},
  extraReducers: {
    [postAddress.fulfilled.type]: (state, action) => {
      state.playerList = {
        status: 'success',
        data: action.meta.arg,
        error: {}
      };
    }
  }
});

export default addressReducer.reducer;
