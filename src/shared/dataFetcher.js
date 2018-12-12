import config from '../config/config';

const tokenFromLocalStorage = localStorage.getItem('token');
const dataFetcher = (url, method, params) => fetch(`${config.url}${url}`, {
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${tokenFromLocalStorage}`,
  },
  body: JSON.stringify(params),
}).then(res => res.json());

export default dataFetcher;
