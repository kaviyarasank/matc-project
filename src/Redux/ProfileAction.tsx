import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postProfile = createAsyncThunk(
  'profile',

  async (data: any) => {
    const postData = await axios({
      method: 'POST',
      url: 'http://localhost:8080/profile',
      data
    }).then((res) => {
     console.log("profile",res)
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

const profilereducer = createSlice({
  name: 'profile',
  initialState: teamInitialState,
  reducers: {},
  extraReducers: {
    [postProfile.fulfilled.type]: (state, action) => {
      state.playerList = {
        status: 'success',
        data: action.meta.arg,
        error: {}
      };
    }
  }
});

export default profilereducer.reducer;
