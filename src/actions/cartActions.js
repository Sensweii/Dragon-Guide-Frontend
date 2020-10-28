import axios from 'axios';
import Cookie from 'js-cookie';

import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING } from '../constants/cartConstants';


const baseURL = 'https://sea-dragon-backend.herokuapp.com/api';
const addToCart = (costumeID, qty) => async (dispatch, getState) => {
    try {
        const {data} = await axios.get(baseURL + '/costumes/retrieve/' + costumeID);
        dispatch({type: CART_ADD_ITEM, payload: {
            costume_id: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty: qty
        }});
        const { cart:{cartItems} } = getState();
        Cookie.set('cartItems', JSON.stringify(cartItems));
    }
    catch (error) {

    }
};

const removeFromCart = (costumeID) => async (dispatch, getState) => {
    try {
        dispatch({type: CART_REMOVE_ITEM, payload: costumeID});
        const { cart:{cartItems} } = getState();
        Cookie.set('cartItems', JSON.stringify(cartItems));
    }
    catch (error) {
        
    }
};

const saveShipping = (data) => async (dispatch, getState) =>{
    dispatch({type: CART_SAVE_SHIPPING, payload: data});
    const currentState = getState();
    const shippingDetails = currentState.cart.shipping;
    Cookie.set('shippingDetails', JSON.stringify(shippingDetails));
};

const savePayment = (data) => (dispatch) =>{
    dispatch({type: CART_SAVE_PAYMENT, payload: data});
};


export { addToCart, removeFromCart, saveShipping, savePayment };
