import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPathname = createAsyncThunk(
  'getpathName',
  async () => {
    const fetchData = await axios({
      method: 'GET',
      url: 'http://localhost:8080/pathName',
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

const getPathInfo = createSlice({
  name: 'getPathInfo',
  initialState: teamInitialState,
  reducers: {},
  extraReducers: {
    [fetchPathname.fulfilled.type]: (state, action) => {
      state.playerList = {
        status: 'success',
        data: action.payload,
        error: {}
      };
    }
  }
});

export default getPathInfo.reducer;
