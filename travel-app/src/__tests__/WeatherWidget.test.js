import { render } from '@testing-library/react';
import WeatherWidget from '../components/WeatherWidget.js';

//////////
// Unit Test
//////////
test('WeatherWidget renders correctly with a cityId', () => {
  const { container } = render(<WeatherWidget cityId={123} />);
  expect(container).toMatchSnapshot();
});