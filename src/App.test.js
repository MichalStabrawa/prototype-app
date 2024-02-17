import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { auth, database } from "./firebase/firebase"; // Import auth and database from firebase.js
import store from "../src/store/index";
import { Provider } from "react-redux";
// Mock Firebase
jest.mock("./firebase/firebase", () => {
  const firebaseAuthMock = jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(),
    currentUser: null,
  }));

  const firebaseDatabaseMock = jest.fn(() => ({
    ref: jest.fn(() => ({
      push: jest.fn(),
    })),
  }));

  return {
    auth: firebaseAuthMock,
    database: firebaseDatabaseMock,
  };
});

// Test the App component
test("renders App component", () => {
  render(
    <Provider store={store}>
      {" "}
      {/* Wrap App with Provider and provide the store */}
      <App />
    </Provider>
  );
  // Add your test assertions here
});
