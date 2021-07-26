import axios from 'axios';

export const axiosClient = axios.create({
  // baseURL: 'https://5e79b4b817314d00161333da.mockapi.io',
  baseURL: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});