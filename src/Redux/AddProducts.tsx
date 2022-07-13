import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postProduct = createAsyncThunk(
  'products',

  async (data: any) => {
    const postData = await axios({
      method: 'POST',
      url: 'http://localhost:8080/postProduct',
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

const productreducer = createSlice({
  name: 'products',
  initialState: teamInitialState,
  reducers: {},
  extraReducers: {
    [postProduct.fulfilled.type]: (state, action) => {
      state.playerList = {
        status: 'success',
        data: action.meta.arg,
        error: {}
      };
    }
  }
});

export default productreducer.reducer;
