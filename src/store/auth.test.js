import { authActions } from './auth'; // Import authActions
import authReducer from './auth'; // Import authReducer (default export)

describe('auth slice', () => {
  it('should handle login action', () => {
    const initialState = {
      isAuthenticated: false,
    };

    // Dispatch login action
    const newState = authReducer(initialState, authActions.login());

    // Check if isAuthenticated is set to true after login
    expect(newState.isAuthenticated).toBe(true);
  });

  it('should handle logoff action', () => {
    const initialState = {
      isAuthenticated: true,   
    };

    // Dispatch logoff action
    const newState = authReducer(initialState, authActions.logoff());

    // Check if isAuthenticated is set to false after logoff
    expect(newState.isAuthenticated).toBe(false);
  });
});