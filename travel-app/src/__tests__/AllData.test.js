import React from 'react';
import { render, waitFor} from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import AllData from '../components/AllData.js';

jest.mock('axios');

describe('AllData component', () => {
    //////////
    // Integration Tests (3 features tested)
    //////////
    it('fetches data', async () => {
    const mockWeatherData = {
        main: { 
            temp: 30,
            feels_like: 31,
            humidity: 50},
        wind: {
            speed: 2.00
        },
        visibility: 5000,
        clouds: {
            all: 100
        },
        weather: [
            {
              icon: 'Sun',
              description: 'Clear Sky',
            },
          ],
        timezone: 100,
        dt: 1000,
        };
    });
    const mockAirPollutionData = {
        main: { aqi: 3 },
        components: {
          co: 0.1,
          no: 0.2,
          no2: 0.3,
          o3: 0.4,
          so2: 0.5,
          pm2_5: 0.6,
          pm10: 0.7,
          nh3: 0.8,
        }
    };
    const mockForecastData = {
        dt: 1000,
        main: {
        temp: 30,
        },
        weather: [
        {
            icon: 'Sun',
            description: 'Clear sky',
        },
        ],
        wind: {
        speed: 1,
        },
        clouds: {
        all: 2,
        },
        pop: 3,
        rain: 4,
        snow: 5
    };
    const mockCity = 'MockCity';

    axios.get.mockResolvedValueOnce(mockWeatherData);
    axios.get.mockResolvedValueOnce(mockAirPollutionData);
    axios.get.mockResolvedValueOnce(mockForecastData);

    const setWeatherData = jest.fn();
    const setForecastData = jest.fn();
    const setAirPollutionData = jest.fn();

    render(
        <AllData
          city={mockCity}
          setWeatherData={setWeatherData}
          setForecastData={setForecastData}
          setAirPollutionData={setAirPollutionData}
        />
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(3); 
      expect(setWeatherData).toHaveBeenCalledWith(mockWeatherData);
      expect(setForecastData).toHaveBeenCalledWith(mockForecastData.list);
      expect(setAirPollutionData).toHaveBeenCalledWith(mockAirPollutionData);
    });
  });

