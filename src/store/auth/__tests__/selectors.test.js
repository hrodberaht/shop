import * as selectors from '../selectors';

describe('selectors for auth', () => {
  const state = {
    auth: {
      auth: false,
      error: 'error',
    },
  };

  it('should return value of auth', () => {
    expect(selectors.getAuthStatus(state)).toEqual(false);
  });

  it('should return value of error', () => {
    expect(selectors.getAuthError(state)).toBe('error');
  });
});
