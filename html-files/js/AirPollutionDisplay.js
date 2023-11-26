// AirPollutionDisplay.js
import React from 'react';

const AirPollutionDisplay = ({ airPollutionData }) => {
    if (!airPollutionData) {
        return null; // Don't render anything if the data is not available
      }
      return (
  <div>
    <h2>Air Pollution Details</h2>
    <table>
      <thead>
        <tr>
          <th>Air Quality Index</th>
          <th>Main Pollutant</th>
          <th>CO</th>
          <th>NO</th>
          <th>NO2</th>
          <th>O3</th>
          <th>SO2</th>
          <th>PM2.5</th>
          <th>PM10</th>
          <th>NH3</th>
        </tr>
      </thead>
      <tbody>
        {airPollutionData && (
          <tr>
            <td>{airPollutionData.main.aqi}</td>
            <td>{airPollutionData.main.main}</td>
            <td>{airPollutionData.components.co}</td>
            <td>{airPollutionData.components.no}</td>
            <td>{airPollutionData.components.no2}</td>
            <td>{airPollutionData.components.o3}</td>
            <td>{airPollutionData.components.so2}</td>
            <td>{airPollutionData.components.pm2_5}</td>
            <td>{airPollutionData.components.pm10}</td>
            <td>{airPollutionData.components.nh3}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
};

export default AirPollutionDisplay;