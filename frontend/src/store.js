import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import { productUpdateReducer, productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer} from "./reducers/productReducers.js";
import { cartReducer } from './reducers/cartReducers.js';
import { userLoginReducer, userDeleteReducer, userUpdateReducer ,userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer } from './reducers/userReducers.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import { orderDeliverReducer, orderCreateReducer, orderDetailReducer, orderPayReducer,orderListReducer, orderListMyReducer } from './reducers/orderReducers.js';


const reducer =  combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart : cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []; 
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null; 
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}; 

const initialState = 
{
    cart : {cartItems : cartItemsFromStorage, shippingAddress : shippingAddressFromStorage},
    userLogin : {userInfo : userInfoFromStorage}
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;