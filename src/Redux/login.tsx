import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postLogin = createAsyncThunk(
  'team/playerListLoading',

  async (data: any) => {
    const postData = await axios({
      method: 'POST',
      url: 'https://98c4-2405-201-e01d-51-25cc-f21e-169-955a.ngrok.io/login',
      data
    }).then((res) => {
      localStorage.setItem('token', JSON.stringify(res?.data));
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

const loginReducer = createSlice({
  name: 'login',
  initialState: teamInitialState,
  reducers: {},
  extraReducers: {
    [postLogin.fulfilled.type]: (state, action) => {
      state.playerList = {
        status: 'success',
        data: action.meta.arg,
        error: {}
      };
    }
  }
});

export default loginReducer.reducer;
