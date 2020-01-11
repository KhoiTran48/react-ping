import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store/index';
import {Provider} from 'react-redux';
import axios from 'axios';
import cookie from 'js-cookie';
import jwt from 'jsonwebtoken'

const jwt_secret = "2xK3UfVp5kUVQQZqxfxX0BxrkF1s4k0pSaOUDPLGJTsuXUOEvhK3MBPtcN7LmxqX"
let access_token = cookie.get("token");
if(access_token){
    jwt.verify(access_token, jwt_secret, (error, decoded)=>{
        if(error){
            access_token = null;
            cookie.remove("token"); 
        }
    })
}

if(access_token){
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
    axios.post("http://localhost:8000/api/auth/me")
    .then(res=>{
        store.dispatch({type: "SET_LOGIN", payload: res.data})  
        render()
    }) 
    .catch(e=>console.log())
}else{
    render()
}

function render()
{
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>
    , document.getElementById('root'));
}



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
 