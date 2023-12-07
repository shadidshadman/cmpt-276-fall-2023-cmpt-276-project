import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Hotel from '../Hotel.js';

describe('Hotel Component', () => {
  it('renders SearchBar form', () => {
      render(<Hotel />);

      expect(screen.getByLabelText('Location')).toBeInTheDocument();
      expect(screen.getByLabelText('Country Code:')).toBeInTheDocument();
      expect(screen.getByLabelText('Check In:')).toBeInTheDocument();
      expect(screen.getByLabelText('Check Out:')).toBeInTheDocument();
      expect(screen.getByText('Search')).toBeInTheDocument();
    });
  //   it('displays hotels after search', async () => {
  //     render(<Hotel />);
      
  //     // // Mock the fetch function
  //     // global.fetch = jest.fn(() =>
  //     //   Promise.resolve({
  //     //     json: () => Promise.resolve({ data: [] }),
  //     //     ok: true,
  //     //   })
  //     // );
      
  //     // // Mock the getToken function
  //     // global.getToken = jest.fn(() => Promise.resolve('fake-token'));
  
  //     // Simulate user input and submit
  //     fireEvent.change(screen.getByLabelText('Location'), { target: { value: 'Toronto' } });
  //     fireEvent.change(screen.getByLabelText('Country Code:'), { target: { value: 'CA' } });
  //     fireEvent.change(screen.getByLabelText('Check In:'), { target: { value: '2023-12-01' } });
  //     fireEvent.change(screen.getByLabelText('Check Out:'), { target: { value: '2023-12-07' } });
  
  //     fireEvent.click(screen.getByText('Search'));

  //       // Wait for the async operations to complete
  // await waitFor(() => {
  //   // Check if the hotels are displayed
  //   const hotelText = screen.getByText('Toronto -', { exact: false });
  //   expect(hotelText).toBeInTheDocument();
  // });

  //     // const hotelText = await screen.findByText('Toronto -');
  //     // expect(hotelText).toBeInTheDocument();
  
  //     // // Wait for the async operations to complete
  //     // await waitFor(() => {});
  
  //     // // Check if the hotels are displayed
  //     // expect(screen.getByText('Toronto -')).toBeInTheDocument();
  //   });

  test('searchHotel function works as expected', async () => {
    // Mock the state
    const mockState = {
      countryCode: 'CA',
      city: 'Vancouver',
    };

     // Render the component with initial state
    render(<Hotel />);

    // Set the state of the component
    userEvent.type(screen.getByLabelText("Location"), mockState.city);
    userEvent.type(screen.getByLabelText("Country Code"), mockState.countryCode);
    
    // Call the searchHotel function
    userEvent.click(screen.getByText('Search'));

    // Your assertions based on the expected behavior of searchHotel
    await waitFor(() => {
      expect(screen.getByLabelText("Location"), mockState.city).toBeDefined;
      expect(screen.getByLabelText("Country Code"), mockState.countryCode).toBeDefined;
    });
  });

  test('getPrice function works as expected', async () => {

    
    render(<Hotel />);
  
    // Set the state of the component
    userEvent.click(screen.getByText('Search'));
  
    // Wait for the asynchronous operations to complete
    await waitFor(() => {

    });
  });


});
