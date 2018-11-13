export const getAuthStatus = ({ authenticate }) => authenticate.auth;

export const getAuthError = ({ authenticate }) => authenticate.error;
export const getAuthToken = ({ authenticate }) => authenticate.token;
export const getAuthRole = ({ authenticate }) => authenticate.user.role;
export const getAuthUserId = ({ authenticate }) => authenticate.user.id;
export const getAuthPerson = ({ authenticate }) => `${authenticate.user.firstName} ${authenticate.user.lastName}`;
export const getAuthCompanyId = ({ authenticate }) => authenticate.user.companyId;
