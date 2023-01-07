import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import ChatProvider from './context/ChatProvider';

//axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "https://realchatapp-api.onrender.com";

//export const frontendurl = "http://localhost:3000";
export const frontendurl = "https://investmentportal.netlify.app";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ChatProvider>
    <App />
  </ChatProvider>
  </BrowserRouter>
);


