import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "../components/Profile.js"
import { MemoryRouter } from "react-router-dom";

// checks if the page correctly renders view for logged in users
// test("user page renders appropriate content when logged in", () => {
//   const testUser = {
//     id: "123456789",
//     fullName: "Test User",
//     type: "attendee"
//   };

//   // ARRANGE
//   render(
//     <MemoryRouter>
//       <Profile isLoggedIn={true} user={testUser} />
//     </MemoryRouter>
//   );

//   // ACT & ASSERT
//   expect(screen.getByText("My Profile")).toBeInTheDocument();
//   expect(screen.getByText("Test User")).toBeInTheDocument();
// });

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