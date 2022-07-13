import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const postProductCart = createAsyncThunk(
  'addProductreducer',

  async (data: any) => {
    const postData = await axios({
      method: 'POST',
      url: 'http://localhost:8080/addToCart',
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

const addProductreducer = createSlice({
  name: 'products',
  initialState: teamInitialState,
  reducers: {},
  extraReducers: {
    [postProductCart.fulfilled.type]: (state, action) => {
      state.playerList = {
        status: 'success',
        data: action.meta.arg,
        error: {}
      };
    }
  }
});

export default addProductreducer.reducer;
