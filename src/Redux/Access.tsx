import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fectchAccess = createAsyncThunk(
  'access/playerListLoading',
  async () => {
    const fetchData = await axios({
      method: 'GET',
      url: 'http://cbf1-2405-201-e01d-51-a3fd-5b91-b916-9c9c.ngrok.io/',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
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

const accessSlice = createSlice({
  name: 'access',
  initialState: teamInitialState,
  reducers: {},
  extraReducers: {
    [fectchAccess.fulfilled.type]: (state, action) => {
      state.playerList = {
        status: 'success',
        data: action.payload,
        error: {}
      };
    }
  }
});

export default accessSlice.reducer;
