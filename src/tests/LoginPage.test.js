import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { Provider } from "react-redux";
import store from "../redux/store";

jest.mock("axios", () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

describe("Jest Snapshot testing suite", () => {
  it("Matches DOM Snapshot", () => {
    const domTree = renderer
      .create(
        <Provider store={store}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(domTree).toMatchSnapshot();
  });
});
