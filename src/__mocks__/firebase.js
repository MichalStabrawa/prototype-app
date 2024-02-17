// __mocks__/firebaseAuth.js

export const signInWithEmailAndPassword = jest.fn();
export const createUserWithEmailAndPassword = jest.fn();
export const signOut = jest.fn();

// Optionally, you can mock currentUser
export const currentUser = {
    uid: 'mock-uid',
    email: 'mock@example.com',
    // Add other properties as needed
};