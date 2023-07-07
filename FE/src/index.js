import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './Components/Router';
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="256102566226-ufj91f4b1d972q7n9m8qlessa3305j4b.apps.googleusercontent.com"><Router /></GoogleOAuthProvider>;
  </React.StrictMode>
);


