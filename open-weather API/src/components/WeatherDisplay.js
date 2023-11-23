import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  return (
    <div>
      <h2>Current Weather in {weatherData.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Temperature</th>
            <th>Feels Like</th>
            <th>Humidity</th>
            <th>Wind Speed</th>
            <th>Visibility</th>
            <th>Cloudiness</th>
            <th>Weather</th>
            <th>Timezone</th>
            <th>Data Calculated at</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{Math.round(weatherData.main.temp - 273.15)}°C</td>
            <td>{Math.round(weatherData.main.feels_like - 273.15)}°C</td>
            <td>{weatherData.main.humidity}%</td>
            <td>{weatherData.wind.speed} m/s</td>
            <td>{weatherData.visibility} meters</td>
            <td>{weatherData.clouds.all}%</td>
            <td>
              {weatherData.weather.map((item, index) => (
                <div key={index}>
                  <img 
                    src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`} 
                    alt={item.description}
                  />
                  <p>{item.description}</p>
                </div>
              ))}
            </td>
            <td>{`UTC${weatherData.timezone / 3600 >= 0 ? '+' : ''}${weatherData.timezone / 3600}`}</td>
            <td>{new Date(weatherData.dt * 1000).toLocaleString()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeatherDisplay;