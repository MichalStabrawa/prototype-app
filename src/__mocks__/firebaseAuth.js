// src/__mocks__/firebaseAuth.js

// Mock signInWithEmailAndPassword method
export const signInWithEmailAndPassword = jest.fn().mockResolvedValue({
    user: {
      uid: 'mock-uid',
      email: 'mock@example.com',
      // Add other properties as needed
    },
  });
  
  // Mock createUserWithEmailAndPassword method
  export const createUserWithEmailAndPassword = jest.fn().mockResolvedValue({
    user: {
      uid: 'mock-uid',
      email: 'mock@example.com',
      // Add other properties as needed
    },
  });
  
  // Mock signOut method
  export const signOut = jest.fn().mockResolvedValue();
  
  // Optionally, you can mock currentUser
  export const currentUser = {
    uid: 'mock-uid',
    email: 'mock@example.com',
    // Add other properties as needed
  };