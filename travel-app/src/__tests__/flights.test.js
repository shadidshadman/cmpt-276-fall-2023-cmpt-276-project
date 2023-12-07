import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Flights from '../flights.js';

describe('Flights Component', () => {
    it('renders SearchBar form', () => {
        render(<Flights />);
  
        expect(screen.getByLabelText('Departure Location:')).toBeInTheDocument();
        expect(screen.getByLabelText('Arrival Location:')).toBeInTheDocument();
        expect(screen.getByLabelText('Arrival Date:')).toBeInTheDocument();
        expect(screen.getByLabelText('Departure Date:')).toBeInTheDocument();
        expect(screen.getByText('Search')).toBeInTheDocument();
      });

      test('getOriginIata function works as expected', async () => {
        // Mock the state



        render(<Flights />);
      
        // Set the state of the component
        userEvent.click(screen.getByText('Search'));
      
        // Wait for the asynchronous operations to complete
        await waitFor(() => {

        });
      });

      test('getFlightInfo function works as expected', async () => {
        // Mock the state
        


        render(<Flights />);
      
        // Set the state of the component
        userEvent.click(screen.getByText('Search'));
      
        // Wait for the asynchronous operations to complete
        await waitFor(() => {

        });
      });

    
  });