import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
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
            <Route path="/" exact={true} component={HomeScreen}></Route>
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
