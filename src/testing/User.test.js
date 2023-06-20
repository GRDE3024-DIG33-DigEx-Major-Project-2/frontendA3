import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import User from '../User';

// checks if the page correctly renders H1 title
test('user page renders title and username', () => {
  
  const testUser = {
    id: "123456789",
    name: "Test User"
  }

  // ARRANGE
  render(<User user={testUser} />);

  // ACT & ASSERT
  expect(screen.getByText(`${testUser.name}'s homepage`)).toBeInTheDocument();
});
