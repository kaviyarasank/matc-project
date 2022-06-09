import { configureStore } from "@reduxjs/toolkit";
import reducerTeam from "./Action"
import cartReducer from "./CardAction";

export const store = configureStore({
    reducer: {
        team: reducerTeam,
        cart: cartReducer,
      }
});

export type AppDispatch = typeof store.dispatch;