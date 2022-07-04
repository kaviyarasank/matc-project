import { configureStore } from "@reduxjs/toolkit";
import reducerTeam from "./Action"
import cartReducer from "./CardAction";
import likeReducer from "./LikeAction";
import loginReducer from "./login";
import reducerAccess from "./Access";
import registerReducer from "./RegisterAction";

export const store = configureStore({
    reducer: {
        team: reducerTeam,
        cart: cartReducer,
        like:likeReducer,
        login:loginReducer,
        access:reducerAccess,
        register:registerReducer,
      }
});

export type AppDispatch = typeof store.dispatch;