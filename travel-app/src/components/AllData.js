// AllData.js
import { useEffect } from 'react';
import axios from 'axios';

const AllData = ({ city, setWeatherData, setForecastData, setAirPollutionData }) => {
  const appid = '463bce9969af3f76b2c3f7ddecd37e80';
  
  useEffect(() => {
    if (city) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`)
        .then((response) => {
          const { lat, lon } = response.data.coord;
          setWeatherData(response.data);

          axios
            .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${appid}&units=metric`)
            .then((response) => {
              setForecastData(response.data.list);
            })
            .catch((error) => {
              console.error("Error fetching forecast data", error);
            });

          axios
            .get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${appid}`)
            .then((response) => {
              setAirPollutionData(response.data.list[0]);
            })
            .catch((error) => {
              console.error("Error fetching air pollution data", error);
            });
        })
        .catch((error) => {
          console.error("Error fetching weather data", error);
        });
    }
  }, [city]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
};

export default AllData;