import React from 'react';

const ForecastDisplay = ({ forecastData }) => {
  if (!forecastData) {
    return null; // Don't render anything if the data is not available
  }
  return (
  <div>
    <h2>Forecast (next 5 days)</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Temperature</th>
            <th>Weather</th>
            <th>Wind Speed</th>
            <th>Cloudiness</th>
            <th>Probability of Precipitation</th>
            <th>Rain Volume</th>
            <th>Snow Volume</th>
          </tr>
        </thead>
        <tbody>
          {forecastData && forecastData.map((data, index) => {
            const forecastTime = new Date(data.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
            return (
              <tr key={index}>
                <td>{new Date(data.dt * 1000).toLocaleDateString()}</td>
                <td>{forecastTime}</td>
                <td>{Math.round(data.main.temp)}°C</td>
                <td>
                {data.weather.map((weather, index) => (
                    <div key={index}>
                      <img 
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
                        alt={weather.description}
                      />
                      <p>{weather.description}</p>
                    </div>
                  ))}
                </td>
                <td>{data.wind.speed} m/s</td>
                <td>{data.clouds.all}%</td>
                <td>{data.pop}%</td>
                <td>{data.rain ? data.rain['3h'] : 0} mm</td>
                <td>{data.snow ? data.snow['3h'] : 0} mm</td>
              </tr>
            );
          })}
        </tbody>
      </table>
  </div>
);
};

export default ForecastDisplay;