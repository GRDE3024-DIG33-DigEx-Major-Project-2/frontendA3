import { render, screen } from "@testing-library/react";
import Header from "../components/Header.js";
import { MemoryRouter } from "react-router-dom";

// checks if four links are present in the NavBar
test("four nav links are displayed", () => {
  // ARRANGE
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  // ACT
  const linkElements = screen.getAllByRole("link");

  // ASSERT
  expect(linkElements.length).toEqual(5);
});
