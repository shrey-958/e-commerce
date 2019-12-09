import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';  
//import AppTwo from "./AppTwo"
//import Cart from "./Cart"

import {BrowserRouter as Router, Switch, Route,Link} from "react-router-dom"
function NavBar(){
    return(
        <Router>
        <div className="App">
        <nav><img className="logo" src ="http://pngimg.com/uploads/apple_logo/apple_logo_PNG19690.png"></img>
        <Link to="/cart"><div className="optswitch">Cart</div></Link>
        </nav>
       <AppTwo />
       </div>
       </Router>
    )
}




export default NavBar
