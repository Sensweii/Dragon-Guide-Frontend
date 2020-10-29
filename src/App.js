import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import GoogleLogin from 'react-google-login';

import CostumeListScreen from './screens/CostumeListScreen'
import CostumeScreen from './screens/CostumeScreen'

import './App.css';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import CreateCostumeScreen from './screens/CreateCostumeScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';

function App() {

  const responseGoogle = (response) => {
    console.log(response);
  }

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open")
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  };

  return (
    <BrowserRouter basename="/">
    <div className="grid-container">
        <header className="header">
            <div className="brand">
                <button className="brand-button" onClick={openMenu}>
                    &#9776;
                </button>
                <Link className="brand-name" to="/">Sea Dragon's Guide</Link>
            </div>
            <div className="header-links">
                <a href="/">Cart</a>
                {
                  userInfo ? <Link to='/profile'>{ userInfo.name }</Link> :
                  <Link to="/signin">Sign In</Link>
                }
                <GoogleLogin
                  clientId="583174611306-upmbg6doiaqvhpjae84n3igrlthq2oml.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
            </div>
        </header>
        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>x</button>
            <ul>
                <li>
                    <a href="index.html">Costume Sets</a>
                </li>
                <li>
                    <a href="index.html">Functional Items</a>
                </li>
                <li>
                    <a href="index.html">Guild Sale Items</a>
                </li>
            </ul>
        </aside>
        <main className="main">
          <div className="content">
            <Route path="/signin" component={SigninScreen}></Route>
            <Route path="/register" component={RegisterScreen}></Route>
            <Route path="/costume/:id" component={CostumeScreen}></Route>
            <Route path="/costume-create" component={CreateCostumeScreen}></Route>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/shipping" component={ShippingScreen}></Route>
            <Route path="/payment" component={PaymentScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/" exact={true} component={CostumeListScreen}></Route>
          </div>
        </main>
        <footer className="footer">
            All rights reserved.
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
