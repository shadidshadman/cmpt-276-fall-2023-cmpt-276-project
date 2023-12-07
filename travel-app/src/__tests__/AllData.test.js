import React from 'react';
import { render, waitFor} from '@testing-library/react';
import axios from 'axios';
import AllData from '../components/AllData.js';

jest.mock('axios');

describe('AllData component', () => {
  it('fetches data', async () => {
    const mockWeatherData = {};
    const mockForecastData = {};
    const mockAirPollutionData = {};
    const mockCity = 'MockCity';

    axios.get.mockResolvedValueOnce({ coord: { lat: 1, lon: 2 } });
    axios.get.mockResolvedValueOnce({ mockWeatherData });
    axios.get.mockResolvedValueOnce({ data: { list: mockForecastData.list } });
    axios.get.mockResolvedValueOnce({ data: { list: [mockAirPollutionData] } });

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
      expect(axios.get).toHaveBeenCalledTimes(4); 
      expect(setWeatherData).toHaveBeenCalledWith(mockWeatherData);
      expect(setForecastData).toHaveBeenCalledWith(mockForecastData.list);
      expect(setAirPollutionData).toHaveBeenCalledWith(mockAirPollutionData);
    });
  });
});