import React from 'react';
import ReactDOM from 'react-dom';
import './client/index.css';
import App from './client/App';
import * as serviceWorker from './client/serviceWorker';


import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootswatch/dist/solar/bootstrap.min.css";
//import "bootswatch/dist/sketchy/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
