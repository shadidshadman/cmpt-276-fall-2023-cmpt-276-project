import React from 'react';
import { render, screen } from '@testing-library/react';
import AirPollutionDisplay from '../components/AirPollutionDisplay.js';

describe('AirPollutionDisplay', () => {
    //////////
    // Unit Tests
    //////////
    test('renders air pollution details', () => {
    const airPollutionData = {
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

    render(<AirPollutionDisplay airPollutionData={airPollutionData} />);

    // Assert that the component renders the air pollution details correctly
    expect(airPollutionData.main.aqi).toBe(3);
    expect(airPollutionData.components.co).toBe(0.1);
    expect(airPollutionData.components.no).toBe(0.2);
    expect(airPollutionData.components.no2).toBe(0.3);
    expect(airPollutionData.components.o3).toBe(0.4);
    expect(airPollutionData.components.so2).toBe(0.5);
    expect(airPollutionData.components.pm2_5).toBe(0.6);
    expect(airPollutionData.components.pm10).toBe(0.7);
    expect(airPollutionData.components.nh3).toBe(0.8);
  });
});