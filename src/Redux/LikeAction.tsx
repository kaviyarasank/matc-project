import { createSlice } from '@reduxjs/toolkit';

const initialState: any = [];

const cartSlice = createSlice({
  name: 'like',
  initialState: initialState,
  reducers: {
    likeState(state, { payload }) {
      const { id } = payload;

      const find = state.find((item: any) => item.id === id);
      if (find) {
        return state.map((item: any) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1
              }
            : item
        );
      } else {
        state.push({
          ...payload,
          quantity: 1
        });
      }
    },
    clearLikes(state, { payload }) {
      return state.filter((item: any) => item.id !== payload);
    }
  }
});

export const { clearLikes, likeState } = cartSlice.actions;
const likeReducer = cartSlice.reducer;

export default likeReducer;
