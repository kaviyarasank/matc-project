import { createSlice } from "@reduxjs/toolkit";

const initialState:any = []

const cartSlice = createSlice({
  name: "cart",
  initialState:initialState,
  reducers: {
    addToCart(state, { payload }) {
      console.log("statee",state)
      const { id } = payload;

      const find = state.find((item:any) => item.id === id);

      if (find) {
        return state.map((item:any) =>
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
    increament(state, { payload }) {
      console.log("======>",payload)
      return state.map((item:any) =>
        item.id === payload
          ? {
              ...item,
              quantity: item.quantity + 1
            }
          : item
      );
    },
    decrement(state, { payload }) {
      console.log("ssssss",state)
      return state.map((item:any) =>
        item.id === payload
          ? {
              ...item,
              quantity: item.quantity - 1
            }
          : item
      );
    },
    clear(state,{payload}) {
      return state.filter((item:any) =>
        item.id !== payload
      );
    }
  }
});

export const { addToCart, increament, decrement, clear } = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export default cartReducer;
