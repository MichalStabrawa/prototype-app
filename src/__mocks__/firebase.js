// __mocks__/firebase.js

const firebaseMock = {
  initializeApp: jest.fn(),
  auth: jest.fn(() => ({
    currentUser: null,
    signInWithEmailAndPassword: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
  })),
  database: jest.fn(() => ({
    ref: jest.fn(() => ({
      child: jest.fn(() => ({
        set: jest.fn(),
        once: jest.fn(),
      })),
    })),
  })),
};

export default firebaseMock;