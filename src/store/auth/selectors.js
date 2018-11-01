export const getAuthStatus = ({ auth }) => auth.auth;

export const getAuthError = ({ auth }) => auth.error;
export const getAuthToken = ({ auth }) => auth.token;
export const getAuthRole = ({ auth }) => auth.user.role;
export const getAuthUserId = ({ auth }) => auth.user.id;
export const getAuthPerson = ({ auth }) => `${auth.user.firstName} ${auth.user.lastName}`;
