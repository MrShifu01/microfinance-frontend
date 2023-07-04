import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../redux/store";
import AdminPage from "../pages/AdminPage";

jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

test("Clicking on 'Edit User Permissions' button opens the modal", async () => {

  // Render the component
  render(
    <Provider store={store}>
      <BrowserRouter>
        <AdminPage />
      </BrowserRouter>
    </Provider>
  );

  // Find the 'Edit User Permissions' button
  const editButton = screen.getByText("Edit User Permissions");

  // Click the 'Edit User Permissions' button
  fireEvent.click(editButton);

  // Verify that the modal is open
  const modal = screen.getByText("Edit User Permissions");
  expect(modal).toBeInTheDocument();
});
