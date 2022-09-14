import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:5000";
//axios.defaults.baseURL = "https://investmentportal.herokuapp.com/w3s/v1";

//export const frontendurl = "http://localhost:3000";
//export const frontendurl = "https://investmentportal.netlify.app";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
);


