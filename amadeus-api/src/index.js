import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Hotel from './Hotel';
import reportWebVitals from './reportWebVitals';
import Flights from './flights';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Flights />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
