const token = localStorage.getItem('token');
const uri = process.env.REACT_APP_API_URI;
const graphqlUri = process.env.REACT_APP_GRAPHQL_API_URI;
const dataFetcher = (endpoint, method, params) => fetch(`${uri}${endpoint}`, {
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify(params),
}).then(res => res.json());

export const dataFetcherGraphQL = params => fetch(graphqlUri, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ ...params, token }),
}).then(res => res.json());

export default dataFetcher;
