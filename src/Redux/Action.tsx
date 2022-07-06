import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPlayerList = createAsyncThunk(
  'team/playerListLoading',
  async () => {
     let userData = JSON.parse(localStorage.getItem('token') || '{}');
    const fetchData = await axios({
      method: 'GET',
  url: 'https://amazon-scriper-hmd.p.rapidapi.com/search/rolexWatch',
  params: {api_key: '0afaa9a567d3a869b1f5c705f87b0687'},
  headers: {
    'X-RapidAPI-Key': 'a08b46e4f2msh25a8dc2a3d14f2fp17daeajsna7b2bc642d72',
    'X-RapidAPI-Host': 'amazon-scriper-hmd.p.rapidapi.com',
        'X-access-token':`${userData?.Token}`
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
  }
);

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
