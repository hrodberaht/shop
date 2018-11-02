import * as selectors from '../selectors';

describe('selectors for auth', () => {
  const state = {
    auth: {
      auth: false,
      error: 'error',
      token: '1234',
      user: {
        role: 'admin',
      },
    },
  };

  it('should return value of auth', () => {
    expect(selectors.getAuthStatus(state)).toEqual(false);
  });

  it('should return value of error', () => {
    expect(selectors.getAuthError(state)).toBe('error');
  });
  it('should return value of token', () => {
    expect(selectors.getAuthToken(state)).toBe('1234');
  });
  it('should return value of role', () => {
    expect(selectors.getAuthRole(state)).toBe('admin');
  });
});
