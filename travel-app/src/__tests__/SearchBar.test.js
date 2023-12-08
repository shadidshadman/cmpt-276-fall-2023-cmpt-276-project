import React from 'react';
import { render, waitFor} from '@testing-library/react';
import axios from 'axios';
import SearchBar from '../components/SearchBar.js';

jest.mock('axios');

describe('SearchBar component', () => {
    it('fetches data', async () => {
      const mockItems = {City1, City2};
      const mockInput = 'MockInput';
  
      axios.get.mockResolvedValueOnce({ data: mockItems });
  
      const setmockItems = jest.fn();
  
      render(<SearchBar/>);
  
      await waitFor(() => {
        expect(axios.get).toHaveBeenCalledTimes(1); 
        expect(setmockItems).toHaveBeenCalledWith(mockItems);
      });
    });
  });