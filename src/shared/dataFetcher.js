import config from '../config/config';

const token = localStorage.getItem('token');
const dataFetcher = (url, method, params) => fetch(`${config.url}${url}`, {
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(params),
}).then(res => res.json());

export const dataFetcherGraphQL = (url, params) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ ...params, token }),
}).then(res => res.json());

export default dataFetcher;
