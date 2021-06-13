import axios from 'axios';

const URL = `http://dreamtechnology.id/testnode/`;
const URL_LOCAL = `http://localhost:5000/testnode/`;

// Set config defaults when creating the instance
export const APIPOS = axios.create({
  baseURL: URL_LOCAL,
});

// // Alter defaults after instance has been created
export const setAPIPOS = (bearer = '', apikey = '') => {
  APIPOS.defaults.headers.common['Authorization'] = bearer;
  APIPOS.defaults.headers.common['apikey'] = apikey;
  APIPOS.defaults.headers.common['appnumber'] = '20210316';
};
