import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postRegister = createAsyncThunk(
  'register/playerListLoading',

  async (data: any) => {
    const postData = await axios({
      method: 'POST',
      url: 'http://localhost:3002/register',
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
