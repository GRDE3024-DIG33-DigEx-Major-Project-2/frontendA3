import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Blog from '../Blog';

// checks if the page correctly renders H1 title
test('blog page renders title', async () => {
  // ARRANGE
  render(<Blog />);

  // ACT and ASSERT
  expect(screen.getByText("Blog page")).toBeInTheDocument();
});
