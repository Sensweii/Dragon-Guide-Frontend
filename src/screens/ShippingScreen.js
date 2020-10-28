import React, { useState } from "react";
import { useDispatch } from "react-redux";
import store from '../store';

import { saveShipping } from '../actions/cartActions'
import CheckoutSteps from "../components/CheckoutSteps";


function ShippingScreen (props) {

    const currentState = store.getState();
    const shippingDetails = currentState.cart.shipping;
    const [address, setAddress] = useState(shippingDetails ? shippingDetails.address : '');
    const [city, setCity] = useState(shippingDetails ? shippingDetails.city : '');
    const [postalCode, setPostalCode] = useState(shippingDetails ? shippingDetails.postalCode : '');
    const [country, setCountry] = useState(shippingDetails? shippingDetails.country : '');
    const [shippingFormError, setShippingFormError] = useState('');

    const dispatch = useDispatch();

    // Validate input
    function validateShippingForm(postalCode){
        const postalCodeError = (
            /^\d+$/.test(postalCode)
            ? null
            : 'Invalid post code number.'
        );
        setShippingFormError(postalCodeError);
        return postalCodeError
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const shippingFormError = validateShippingForm(postalCode);
        if(!shippingFormError){
            dispatch(saveShipping({address, city, postalCode, country}));
            props.history.push('/payment');
        } else {
            // Re-render to show page error
            props.history.push('/shipping')
        }
    };

    return(<div>
    <CheckoutSteps step1 step2></CheckoutSteps>
    <div className='form'>
        <form onSubmit={onSubmitHandler}>
            <ul className='form-container'>
                <li>
                    <h2>Shipping</h2>
                </li>
                {
                    shippingFormError ? <li className='form-error-message'
                        >{shippingFormError}</li> : null
                }
                <li>
                    <label htmlFor='address'>Address</label>
                    <input type='text'
                        name='address'
                        id='address'
                        required={true}
                        value={address}
                        onChange={(e) => {setAddress (e.target.value)}}>    
                    </input>
                </li>
                <li>
                    <label htmlFor='city'>City</label>
                    <input type='text'
                        name='city'
                        id='city'
                        required={true}
                        value={city}
                        onChange={(e) => {setCity (e.target.value)}}>    
                    </input>
                </li>
                <li>
                    <label htmlFor='postalCode'>Postal Code</label>
                    <input type='text'
                        name='postalCode'
                        id='postalCode'
                        required={true}
                        value={postalCode}
                        onChange={(e) => {setPostalCode (e.target.value)}}>    
                    </input>
                </li>
                <li>
                    <label htmlFor='country'>Country</label>
                    <input type='text'
                        name='country'
                        id='country'
                        required={true}
                        value={country}
                        onChange={(e) => {setCountry (e.target.value)}}>
                    </input>
                </li>
                <li>
                    <button type='submit' className='button primary'>Continue</button>
                </li>
            </ul>
        </form>
    </div>
    </div>
    );
}

export default ShippingScreen;
