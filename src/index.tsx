import React from 'react';
import ReactDOM from 'react-dom';
import './client/index.css';
import App from './client/App';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootswatch/dist/solar/bootstrap.min.css";
//import "bootswatch/dist/sketchy/bootstrap.min.css";

ReactDOM.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
    document.getElementById('root')
);
