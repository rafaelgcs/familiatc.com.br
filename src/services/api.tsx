import axios from 'axios';

import { panel } from './auth';

const panelUrl = process.env.REACT_APP_PANEL_URL_API_LOCAL;

const panelApi = axios.create({
  baseURL: panelUrl,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const panelAuthApi = axios.create({
  baseURL: panelUrl,
  headers: {
    Authorization: `Bearer ${panel.panelGetToken()}`,
    'Content-Type': 'application/json',
    Accept: '/'
  }
});

// const url = process.env.REACT_APP_URL_API_LOCAL;

// const api = axios.create({
//     baseURL: url,
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//     },
// });

// const apiAuth = axios.create({
//     baseURL: url,
//     headers: {
//         Authorization: `Bearer ${getToken()}`,
//         "Content-Type": "application/json",
//         Accept: "/",
//     },
// });

export { panelApi, panelAuthApi };
