import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Hotel from './Hotel';
import Flights from './flights';


const SearchBarWeather = ReactDOM.createRoot(document.getElementById('searchBarWeather'));
const searchBarHotel = ReactDOM.createRoot(document.getElementById('searchBarHotel'));
const searchBarFligihts = ReactDOM.createRoot(document.getElementById('searchBarFlights'));



SearchBarWeather.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
searchBarHotel.render(
  <React.StrictMode>
    <Hotel />
  </React.StrictMode>
);

searchBarFligihts.render(
  <React.StrictMode>
    <Flights />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
