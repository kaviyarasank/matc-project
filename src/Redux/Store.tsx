import { configureStore } from '@reduxjs/toolkit';
import reducerTeam from './Action';
import cartReducer from './CardAction';
import likeReducer from './LikeAction';
import loginReducer from './login';

export const store = configureStore({
  reducer: {
    team: reducerTeam,
    cart: cartReducer,
    like: likeReducer,
    login: loginReducer
  }
});

export type AppDispatch = typeof store.dispatch;
