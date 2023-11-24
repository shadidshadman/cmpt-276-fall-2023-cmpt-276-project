import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay';
import AirPollutionDisplay from './components/AirPollutionDisplay';
import AllData from './components/AllData';
import WeatherWidget from './components/WeatherWidget';
import './App.css';

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
      <WeatherWidget cityId="6173331" /> {/* Vancouver */}
      <WeatherWidget cityId="5128581" /> {/* New York */}
      <WeatherWidget cityId="2643743" /> {/* London */}
      <WeatherWidget cityId="2950159" /> {/* Berlin */}
      <WeatherWidget cityId="2147714" /> {/* Sydney */}
    </div>
  );
};

export default App;