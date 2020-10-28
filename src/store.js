import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import Cookie from 'js-cookie';

import { costumesListReducer, costumeDetailsReducer, costumeSaveReducer, costumeDeleteReducer } from './reducers/costumesReducer';
import { cartReducer } from './reducers/cartReducer'
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';


const cartItems = Cookie.getJSON('cartItems') || [];
const userInfo = Cookie.getJSON('userInfo') || null;
const shippingDetails = Cookie.getJSON('shippingDetails') || null;

const initialState = { 
    cart: { cartItems, shipping:shippingDetails, payment:{} },
    userSignin: { userInfo },
};
const reducer = combineReducers({
    costumesList:  costumesListReducer,
    costumeDetails: costumeDetailsReducer,
    costumeSave: costumeSaveReducer,
    costumeDelete: costumeDeleteReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;
