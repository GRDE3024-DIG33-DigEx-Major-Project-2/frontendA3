import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Events from '../Events';

// checks if the page correctly renders H1 title
test('events page renders title', async () => {
  // ARRANGE
  render(<Events />);

  // ACT and ASSERT
  expect(screen.getByText("Events page")).toBeInTheDocument();
});
