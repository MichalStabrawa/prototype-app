// App.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "./store/index";
import App from "./App";

// Mock Firebase imports with correct relative path
jest.mock('./__mocks__/firebase');

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Verify that "learn react" link is present
  const learnReactLink = screen.getByText(/learn react/i);
  expect(learnReactLink).toBeInTheDocument();
});