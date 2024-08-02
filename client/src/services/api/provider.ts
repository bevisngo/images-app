import axios from "axios";
axios.defaults.withCredentials = true;

export const AUTH_SERVICE_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_SERVICE_API,
});

export const READ_SERVICE_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_READ_SERVICE_API,
});

export const WRITE_SERVICE_API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WRITE_SERVICE_API,
});
