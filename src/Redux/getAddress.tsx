import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAddress = createAsyncThunk(
  'getAddress',
  async () => {
    const fetchData = await axios({
      method: 'GET',
      url: 'http://localhost:8080/addressGet',
    })
    .then((response) => {
      if (response.status !== 200) {
        console.error('no fetched data');

        return {};
      } else {
          console.log("responseAccesss",response)
        return response.data;
      }
    });
    return fetchData;
  }
);

const teamInitialState = {
  playerList: {
    status: 'idle',
    data: {},
    error: {}
  }
};

const getAddressInfo = createSlice({
  name: 'getAddressInfo',
  initialState: teamInitialState,
  reducers: {},
  extraReducers: {
    [fetchAddress.fulfilled.type]: (state, action) => {
      state.playerList = {
        status: 'success',
        data: action.payload,
        error: {}
      };
    }
  }
});

export default getAddressInfo.reducer;
