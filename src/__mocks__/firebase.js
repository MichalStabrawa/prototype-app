// __mocks__/firebase.js

// Import the real Firebase module
import { initializeApp } from 'firebase/compat/app';
import { getAuth } from 'firebase/compat/auth';
import { getDatabase } from 'firebase/compat/database';



// Mock the initializeApp function
jest.mock('firebase/compat/app', () => {
  const firebaseMock = {
    initializeApp: jest.fn(),
    auth: getAuth(),
    database: getDatabase(),
  };
  return firebaseMock;
});

// Mock the auth and database functions
jest.mock('firebase/compat/auth', () => getAuth());
jest.mock('firebase/compat/database', () => getDatabase());

// Export the mocked Firebase
export { initializeApp, getAuth, getDatabase };