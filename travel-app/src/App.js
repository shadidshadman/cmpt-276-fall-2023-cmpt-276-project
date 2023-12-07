import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import AirPollutionDisplay from './components/AirPollutionDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import AllData from './components/AllData';
import WeatherWidget from './components/WeatherWidget';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [airPollutionData, setAirPollutionData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  return (
    
    <div className="App">
      <SearchBar setCity={setCity} />
      <WeatherDisplay weatherData={weatherData} />
      <AirPollutionDisplay airPollutionData={airPollutionData} />
      <ForecastDisplay forecastData={forecastData} />
      <AllData 
        city={city} 
        setWeatherData={setWeatherData} 
        setAirPollutionData={setAirPollutionData}
        setForecastData={setForecastData} 
      />
      <div className="weather-widgets">
        <WeatherWidget cityId='6173331' /> {/* Vancouver */}
        <WeatherWidget cityId='5128581' /> {/* New York */}
        <WeatherWidget cityId='2643743' /> {/* London */}
        <WeatherWidget cityId='2950159' /> {/* Berlin */}
        <WeatherWidget cityId='2147714' /> {/* Sydney */}
      </div>
    </div>

  );
}

export default App;