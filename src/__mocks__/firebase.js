// __mocks__/firebase.js
export const firebaseMock = {
  initializeApp: jest.fn(),
  getAuth: jest.fn(),
  getDatabase: jest.fn(),
};