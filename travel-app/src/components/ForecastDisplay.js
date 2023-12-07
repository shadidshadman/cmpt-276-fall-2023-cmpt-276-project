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
            <th>Time Range</th>
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
          {forecastData.map((data, index) => {
            const startTime = new Date(data.dt * 1000);
            const endTime = new Date((data.dt + 3 * 60 * 60) * 1000); // Add 3 hours to the start time
            
            const formattedStartTime = startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Los_Angeles' });
            const formattedEndTime = endTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'America/Los_Angeles' });

            const timeRange = `${formattedStartTime} - ${formattedEndTime}`;

            return (
              <tr key={index}>
                <td>{startTime.toLocaleDateString()}</td>
                <td>{timeRange}</td>
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
                <td>{data.rain ? `${data.rain['3h']} mm` : 'N/A'}</td>
                <td>{data.snow ? `${data.snow['3h']} mm` : 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ForecastDisplay;