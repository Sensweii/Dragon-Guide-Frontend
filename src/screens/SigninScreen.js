import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { signin } from '../actions/userActions'


function SigninScreen (props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;
    const dispatch = useDispatch();
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo)
            props.history.push(redirect);
        return () => {
            //
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userInfo]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return(<div className='form'>
        <form onSubmit={onSubmitHandler}>
            <ul className='form-container'>
                <li>
                    <h2>Sign In</h2>
                </li>
                <li>
                    { loading && <div>Loading...</div>}
                    { error && <div>{error}</div> }
                </li>
                <li>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email'
                        onChange={(e) => {setEmail(e.target.value)}}>    
                    </input>
                </li>
                <li>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password'
                        onChange={(e) => {setPassword(e.target.value)}}>    
                    </input>
                </li>
                <li>
                    <button type='submit' className='button primary'>Sign In</button>
                </li>
                <li>
                    New to Sea Dragon's Guide?
                </li>
                <li>
                    <Link to={ redirect === '/' ? '/register' : '/register?redirect=' + redirect}
                        className='button secondary text-center'>Create Account</Link>
                </li>
            </ul>
        </form>
        
    </div>
    );
}

export default SigninScreen;
