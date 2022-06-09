import { configureStore } from "@reduxjs/toolkit";
import reducerTeam from "./Action"
import cartReducer from "./CardAction";
import likeReducer from "./LikeAction";

export const store = configureStore({
    reducer: {
        team: reducerTeam,
        cart: cartReducer,
        like:likeReducer,
      }
});

export type AppDispatch = typeof store.dispatch;