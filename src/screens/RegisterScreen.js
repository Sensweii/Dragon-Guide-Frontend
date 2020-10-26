import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import { register } from '../actions/userActions'


function RegisterScreen (props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
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
        dispatch(register(name, email, password));
    }

    return(<div className='form'>
        <form onSubmit={onSubmitHandler}>
            <ul className='form-container'>
                <li>
                    <h2>Create Account</h2>
                </li>
                <li>
                    { loading && <div>Loading...</div>}
                    { error && <div>{error}</div> }
                </li>
                <li>
                    <label htmlFor='name'>Name</label>
                    <input type='name' name='name' id='name'
                        onChange={(e) => {setName (e.target.value)}}>    
                    </input>
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
                    <label htmlFor='rePassword'>Re-Enter Password</label>
                    <input type='password' name='rePassword' id='rePassword'
                        onChange={(e) => {setRePassword(e.target.value)}}>    
                    </input>
                </li>
                <li>
                    <button type='submit' className='button primary'>Register</button>
                </li>
                <li>
                    Already have an account? 
                    <Link to={ redirect === '/' ? '/signin' : '/register?redirect=' + redirect}>
                        Sign-in
                    </Link>
                </li>
            </ul>
        </form>
    </div>
    );
}

export default RegisterScreen;