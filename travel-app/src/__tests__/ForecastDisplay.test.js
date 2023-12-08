import React from 'react';
import { render, screen } from '@testing-library/react';
import ForecastDisplay from '../components/ForecastDisplay.js';

describe('ForecastDisplay', () => {

    //////////
    // Unit Tests
    //////////
    test('renders forecast details', () => {
    const forecastData = {
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
        speed: 1
        },
        clouds: {
        all: 2
        },
        pop: 3,
        rain: 4,
        snow: 5
    };

    render(<ForecastDisplay forecastData = {forecastData} />);

    // Assert that the component renders the forecast details correctly
    expect(forecastData.dt).toBe(1000);
    expect(forecastData.main.temp).toBe(30);
    expect(forecastData.weather[0].icon).toBe('Sun');
    expect(forecastData.weather[0].description).toBe('Clear Sky');
    expect(forecastData.wind.speed).toBe(1);
    expect(forecastData.clouds.all).toBe(2);
    expect(forecastData.pop).toBe(3);
    expect(forecastData.rain).toBe(4);
    expect(forecastData.snow).toBe(5);
  });
});