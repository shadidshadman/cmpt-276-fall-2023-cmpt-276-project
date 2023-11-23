import React from 'react';

const WeatherDisplay = ({ weatherData }) => (
  <div>
    {weatherData && (
      <div>
        <h1>{weatherData.name}</h1>
        <h2>Current Conditions</h2>
        <p>Feels Like: {Math.round(weatherData.main.feels_like - 273.15)}°C</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        <p>Visibility: {weatherData.visibility} meters</p>
        <p>Cloudiness: {weatherData.clouds.all}%</p>
        <p>Data Calculated at: {new Date(weatherData.dt * 1000).toLocaleString()}</p>
      </div>
    )}
  </div>
);

export default WeatherDisplay;