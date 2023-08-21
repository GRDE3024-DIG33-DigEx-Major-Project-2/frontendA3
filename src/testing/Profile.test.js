/**
 * Unit tests for profile component
 */

//Import dependencies
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "../components/user/Profile.js"
import { MemoryRouter } from "react-router-dom";


// checks if the page correctly blocks content if users are not logged in
test("user content blocked when user is not logged in", () => {

  // ARRANGE
  render(
    <MemoryRouter>
      <Profile isLoggedIn={false} user={""} />
    </MemoryRouter>
  );

  // ACT & ASSERT
  expect(screen.getByText("You must login to view this page.")).toBeInTheDocument();
});