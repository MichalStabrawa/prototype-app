import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import store from "../../store/index";
import HeaderComponent from "./HeaderComponent";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: jest.fn().mockImplementation(({ children }) => <div>{children}</div>), // Mock Link component
}));

describe("HeaderComponent", () => {
  test('renders h1 with text "Budget APP"', () => {
    render(
      <Provider store={store}>
        <Router>
          {" "}
          {/* Wrap HeaderComponent with BrowserRouter */}
          <HeaderComponent scrollToRef={jest.fn()} />
        </Router>
      </Provider>
    );
    console.log(screen.debug());
    const headerElement = screen.getByText("Budget APP");
    expect(headerElement).toBeInTheDocument();
    const additionalTextElement = screen.getByText("Check currency and gold rates, compare currencies, buy and sell. Manage your household budget");
    expect(additionalTextElement).toBeInTheDocument();
  });
});
