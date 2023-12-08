import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Hotel from '../Hotel.js';

// Mocking the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: [] }),
    ok: true,
  })
);

describe('Hotel Component', () => {
  it('renders SearchBar form', () => {
      render(<Hotel />);

      expect(screen.getByLabelText('Destination Location:')).toBeInTheDocument();
      expect(screen.getByLabelText('Two Letter Country Code:')).toBeInTheDocument();
      expect(screen.getByLabelText('Check In:')).toBeInTheDocument();
      expect(screen.getByLabelText('Check Out:')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
    });

  it('fetches data from API', async () => {
    render(<Hotel />);

    //Mock the getToken function
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ access_token: 'mockToken' }),
      ok: true,
    });

    // Mock API response for location search
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ 
        data: { 
          iataCode: 'ABC', 
          geoCode: { 
            longitude: 1, 
            latitude: 2 
          }
        }}),
      ok: true,
    });

    // Mock API response for hotel ratings
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ data: 5 }),
      ok: true,
    });

    // Mock API response for hotel prices
    global.fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ 
        data: 100 }),
      ok: true,
    });

    // Simulate user interactions
    fireEvent.change(screen.getByLabelText('Destination Location:'), { target: { value: 'Toronto' } });
    fireEvent.change(screen.getByLabelText('Two Letter Country Code:'), { target: { value: 'CA' } });
    fireEvent.change(screen.getByLabelText('Check In:'), { target: { value: '2023-01-01' } });
    fireEvent.change(screen.getByLabelText('Check Out:'), { target: { value: '2023-01-07' } });

    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => expect(screen.queryByTestId('spinner')).not.toBeInTheDocument());

    // Assertions
    expect(screen.getByText(/ABC/)).toBeInTheDocument();
    expect(screen.getByText(/5/)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
  });
});

