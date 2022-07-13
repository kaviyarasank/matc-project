import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postPath = createAsyncThunk(
  'path',

  async (data: any) => {
      console.log("postProduct",data)
    const postData = await axios({
      method: 'POST',
      url: 'http://localhost:8080/path',
      data
    }).then((res) => {
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

const pathreducer = createSlice({
  name: 'path',
  initialState: teamInitialState,
  reducers: {},
  extraReducers: {
    [postPath.fulfilled.type]: (state, action) => {
      state.playerList = {
        status: 'success',
        data: action.meta.arg,
        error: {}
      };
    }
  }
});

export default pathreducer.reducer;
