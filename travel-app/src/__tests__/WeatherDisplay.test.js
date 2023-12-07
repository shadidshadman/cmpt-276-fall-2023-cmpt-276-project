import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherDisplay from '../components/WeatherDisplay';

describe('WeatherDisplay', () => {
  test('renders weather details', () => {
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

    render(<WeatherDisplay weatherData={weatherData} />);

    // Assert that the component renders the forecast details correctly
    expect(weatherData.main.temp).toBe(30);
    expect(weatherData.main.feels_like).toBe(31);
    expect(weatherData.wind.speed).toBe(2.00);
    expect(weatherData.visibility).toBe(5000);
    expect(weatherData.clouds.all).toBe(100);
    expect(weatherData.weather.icon).toBe('Sun');
    expect(weatherData.weather.description).toBe('Clear Sky');
    expect(weatherData.timezone).toBe(100);
    expect(weatherData.dt).toBe(1000);
});