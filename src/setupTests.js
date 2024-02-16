// setupTests.js

// Import necessary dependencies and mocks
import "matchmedia-polyfill";
import "matchmedia-polyfill/matchMedia.addListener";
import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from "util";

// Add global variables
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock the history module
jest.mock('history', () => {
  return {
    createMemoryHistory: jest.fn(),
  };
});
