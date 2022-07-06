import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postRegister = createAsyncThunk(
  'register/playerListLoading',

  async (data: any) => {
    const postData = await axios({
      method: 'POST',
      url: 'https://9845-2405-201-e01d-51-a3fd-5b91-b916-9c9c.ngrok.io/register',
      data
    }).then((res) => {
     console.log("registerres",res)
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

const registerReducer = createSlice({
  name: 'register',
  initialState: teamInitialState,
  reducers: {},
  extraReducers: {
    [postRegister.fulfilled.type]: (state, action) => {
      state.playerList = {
        status: 'success',
        data: action.meta.arg,
        error: {}
      };
    }
  }
});

export default registerReducer.reducer;
