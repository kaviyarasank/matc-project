import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postLogin = createAsyncThunk(
  'team/playerListLoading',

  async (data: any) => {
    const postData = await axios({
      method: 'POST',
      url: 'http://localhost:8080/login',
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
