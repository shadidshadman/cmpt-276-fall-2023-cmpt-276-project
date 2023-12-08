import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Flights from '../flights.js';

// Mocking the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: [] }),
    ok: true,
  })
);

describe('Flights Component', () => {
    it('renders SearchBar form', () => {
        render(<Flights />);
  
        expect(screen.getByLabelText('Departure Location:')).toBeInTheDocument();
        expect(screen.getByLabelText('Arrival Location:')).toBeInTheDocument();
        expect(screen.getByLabelText('Arrival Date:')).toBeInTheDocument();
        expect(screen.getByLabelText('Departure Date:')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
      });

      it('fetches data from API', async () => {
        render(<Flights />);
    
        //Mock the getToken function
        global.fetch.mockResolvedValueOnce({
          json: () => Promise.resolve({ access_token: 'mockToken' }),
          ok: true,
        });
    
        // Mock API response for getDestinationIata
        global.fetch.mockResolvedValueOnce({
          json: () => Promise.resolve({ 
            data: { 
              iataCode: 'YVR', 
              name: 'Vancouver International Airport',
              address: {
                  cityName: Vancouver
              }
            }
            }),
          ok: true,
        });
    
        // Mock API response for getOriginIata
        global.fetch.mockResolvedValueOnce({
            json: () => Promise.resolve({ 
              data: { 
                  iataCode: 'YYZ', 
                  name: 'Toronto Pearson International Airport',
                  address: {
                      cityName: Toronto
                  }
                }
                }),
            ok: true,
          });
    
        // Mock API response for getFlightInfo
        global.fetch.mockResolvedValueOnce({
          json: () => Promise.resolve({ 
            data: 'AC123' }),
          ok: true,
        });
    
        // Simulate user interactions
        fireEvent.change(screen.getByLabelText('Departure Location:'), { target: { value: 'Toronto' } });
        fireEvent.change(screen.getByLabelText('Arrival Location:'), { target: { value: 'Vancouver' } });
        fireEvent.change(screen.getByLabelText('Departure Date:'), { target: { value: '2023-01-01' } });
        fireEvent.change(screen.getByLabelText('Arrival Date:'), { target: { value: '2023-01-07' } });

        fireEvent.click(screen.getByText('Search'));

        // Wait for the loading spinner to disappear
        await waitFor(() => expect(screen.queryByTestId('spinner2')).not.toBeInTheDocument());

        // Assertions
        expect(screen.getByText('Toronto')).toBeInTheDocument();
        expect(screen.getByText('Toronto Pearson International Airport')).toBeInTheDocument();
        expect(screen.getByText('Vancouver')).toBeInTheDocument();
        expect(screen.getByText('Vancouver International Airport')).toBeInTheDocument();
      });
  });