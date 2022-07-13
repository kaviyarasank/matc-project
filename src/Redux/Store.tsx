import { configureStore } from "@reduxjs/toolkit";
import reducerTeam from "./Action"
import cartReducer from "./CardAction";
import likeReducer from "./LikeAction";
import loginReducer from "./login";
import reducerAccess from "./Access";
import registerReducer from "./RegisterAction";
import getProfile from "./getProfileInfoAction";
import profilereducer from "./ProfileAction";
import productreducer from "./AddProducts";
import getProduct from "./getProductInfo";
import addProductreducer from "./AddToCart";
import getCartInfo from "./getCartInfo";
import pathreducer from "./pathAction";
import getPathInfo from "./getPathname";
import addressReducer from "./AddressAction";
import getAddressInfo from "./getAddress";

export const store = configureStore({
    reducer: {
        team: reducerTeam,
        cart: cartReducer,
        like:likeReducer,
        login:loginReducer,
        access:reducerAccess,
        register:registerReducer,
        getProfile:getProfile,
        postProfile:profilereducer,
        postproduct:productreducer,
        getProduct:getProduct,
        addToCart:addProductreducer,
        getCartInfo:getCartInfo,
        path:pathreducer,
        getPathInfo:getPathInfo,
        address:addressReducer,
        addressInfo:getAddressInfo,
      }
});

export type AppDispatch = typeof store.dispatch;