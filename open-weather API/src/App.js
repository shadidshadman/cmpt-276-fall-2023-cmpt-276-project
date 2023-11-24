import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import AirPollutionDisplay from './components/AirPollutionDisplay';
import AllData from './components/AllData';
import './App.css';

// A simple app that uses the Open Weather API to display the current weather, forecast, and air pollution data for a given city.

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airPollutionData, setAirPollutionData] = useState(null);

  return (
    <div className="App">
      <SearchBar setCity={setCity} />
      <WeatherDisplay weatherData={weatherData} />
      <ForecastDisplay forecastData={forecastData} />
      <AirPollutionDisplay airPollutionData={airPollutionData} />
      <AllData 
        city={city} 
        setWeatherData={setWeatherData} 
        setForecastData={setForecastData} 
        setAirPollutionData={setAirPollutionData} 
      />
    </div>
  );
}

export default App;