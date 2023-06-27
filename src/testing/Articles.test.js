import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Articles from '../components/Articles.js';

// checks if the page correctly renders H1 title
test('article page renders title', async () => {
  // ARRANGE
  render(<Articles />);

  // ACT and ASSERT
  expect(screen.getByText("Articles Page")).toBeInTheDocument();
});
