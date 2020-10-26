import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';

function CartScreen(props){

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const costumeID = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;
    const dispatch = useDispatch();

    const removeFromCartHandler = (costume_id) => {
        dispatch(removeFromCart(costume_id));
    };

    useEffect(() => {
        if (costumeID){
            dispatch(addToCart(costumeID, qty));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkoutHandler = () => {
        props.history.push('/signin?redirect=shipping')
    }

    return(
        <div className='cart'>
            <div className='cart-list'>
                <ul className='cart-list-container'>
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>
                            Price
                        </div>
                    </li>
                    {
                        cartItems.length === 0 
                        ? <div>Cart is empty.</div>
                        : cartItems.map( item =>
                            <li key={item.costume_id}>
                                <div className='cart-image'>
                                    <img src={item.image} alt='costume'></img>
                                </div>
                                <div className='cart-name'>
                                    <div>
                                        <Link to={'/costume/' + item.costume_id}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        Qty:
                                        <select value={item.qty} onChange={(e) => dispatch(addToCart(item.costume_id, e.target.value))}>
                                            <option value='1'>1</option>
                                            <option value='2'>2</option>
                                            <option value='3'>3</option>
                                        </select>
                                    </div>
                                    <button type='button'
                                        className='button'
                                        onClick={() => removeFromCartHandler(item.costume_id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div className='cart-price'>
                                    EYET{item.price}
                                </div>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className='cart-action'>
                <h3>
                    Subtotal ( {cartItems.reduce((accumulator, current) => accumulator + current.qty, 0)} )
                    :
                    EYET {cartItems.reduce((accumulator, current) => accumulator + current.price * current.qty, 0)}
                </h3>
                <button onClick={checkoutHandler} className='button primary full-width' disabled={cartItems.length === 0}>
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
}

export default CartScreen;
