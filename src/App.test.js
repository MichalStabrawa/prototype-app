// Mock matchMedia
import "matchmedia-polyfill";
global.matchMedia = jest.fn(() => ({
  matches: false,
  addListener: jest.fn(),
  removeListener: jest.fn(),
}));
import { Provider } from "react-redux"; // Import Provider
import { render, screen } from "@testing-library/react";
import App from "./App";
import store from "./store/index"; // Import your Redux store

jest.mock("firebase/compat/app", () => {
  const auth = jest.fn(() => ({
    // Customize the behavior of auth mock
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    // ... other auth methods
  }));

  const database = jest.fn(() => ({
    // Customize the behavior of database mock
    ref: jest.fn(),
    // ... other database methods
  }));

  return {
    initializeApp: jest.fn(),
    auth,
    database,
  };
});

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
