import config from '../config/config';

const dataFetcher = (url, method, token, params) => fetch(`${config.url}${url}`, {
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(params),
}).then(res => res.json());

export default dataFetcher;
