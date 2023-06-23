import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Home from '../components/Home.js';

// checks if the page correctly renders H1 title
test('home page renders title', async () => {
  // ARRANGE
  render(<Home />);

  // ACT and ASSERT
  expect(screen.getByText("Homepage")).toBeInTheDocument();
});
