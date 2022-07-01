import { createSelector } from '@reduxjs/toolkit';

const cartValue = (state: any) => state.cart;

export const cartTotalPriceSelector = createSelector([cartValue], (cart) =>
  cart.reduce((total: any, current: any) => (total += current.price * current.quantity), 0)
);
