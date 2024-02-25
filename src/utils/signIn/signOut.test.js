import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import signOut from "./signOut";

// Mocking localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

jest.mock("../../firebase/firebase", () => ({
  auth: {
    signOut: jest.fn(() => Promise.resolve()),
  },
}));

describe("signOut", () => {
  it("should sign out the user and remove token from localStorage", async () => {
    // Arrange
    localStorage.setItem("firebaseToken", "dummyToken");
    const logSpy = jest.spyOn(console, "log");

    // Act
    await signOut();

    // Assert
    expect(localStorage.removeItem).toHaveBeenCalledWith("firebaseToken");
    expect(localStorage.getItem("firebaseToken")).toBeUndefined();
    expect(logSpy).toHaveBeenCalledWith("Log off");
  });
});
