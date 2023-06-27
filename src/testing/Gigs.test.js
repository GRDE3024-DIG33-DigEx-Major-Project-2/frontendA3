import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Gigs from '../components/Gigs.js';

// checks if the page correctly renders H1 title
test('Gigs page renders title', async () => {
  // ARRANGE
  render(<Gigs />);

  // ACT and ASSERT
  expect(screen.getByText("Gigs Page")).toBeInTheDocument();
});
