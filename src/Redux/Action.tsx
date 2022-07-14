import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlayerList = createAsyncThunk('team/playerListLoading', async () => {
  const fetchData = await axios({
    method: 'GET',
    url: 'https://isq-amazon-data-scraper.p.rapidapi.com/search/rolexWatch',
    params: { api_key: 'e04e076ea42c6875d5951aeb6393fc9a' },
    headers: {
      'X-RapidAPI-Key': '6999af61b8mshde5bf476e388bfcp15108bjsn66f977fbf077',
      'X-RapidAPI-Host': 'isq-amazon-data-scraper.p.rapidapi.com'
    }
  }).then((response) => {
    if (response.status !== 200) {
      console.error('no fetched data');

      return {};
    } else {
      return response.data;
    }
  });
  return fetchData;
});

const teamInitialState = {
  playerList: {
    status: 'idle',
    data: {},
    error: {}
  }
};

const teamSlice = createSlice({
  name: 'team',
  initialState: teamInitialState,
  reducers: {},
  extraReducers: {
    [fetchPlayerList.fulfilled.type]: (state, action) => {
      state.playerList = {
        status: 'success',
        data: action.payload,
        error: {}
      };
    }
  }
});

export default teamSlice.reducer;
