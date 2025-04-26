import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:7125/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // You can also add timeout, auth headers etc. here
});

export default axiosInstance;
