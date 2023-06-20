import { render, screen } from '@testing-library/react';
import App from '../App';

// checks if four links are present in the NavBar
test('four nav links are displayed', () => {
  // ARRANGE
  render(<App />);

  // ACT
  const linkElements = screen.getAllByRole("link");

  // ASSERT
  expect(linkElements.length).toEqual(4);
});
