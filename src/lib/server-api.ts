'use server';
import axios, { AxiosError } from 'axios';
import { cookies, headers } from 'next/headers';
import {
  API_KEY_HEADER,
  getApiKey,
  getBaseUrl,
  TOKEN_COOKIE,
} from '@/lib/api-config';

const API_SERVICE_SERVER = axios.create({
  baseURL: getBaseUrl(),
  'axios-retry': {
    retries: 1,
    retryDelay: (retryCount) => {
      return retryCount * 3000; // time interval between retries
    },
    retryCondition: (error: AxiosError) => {
      if (error.response?.status === 400 || error.response?.status === 401) {
        return false;
      }
      return true;
    },
  },
  headers: {
    'Access-Control-Allow-Origin': 'true',
    'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
  },
  withCredentials: true,
  proxy: false,
});

API_SERVICE_SERVER.interceptors.request.use(
  async (request) => {
    const cookieStore = await cookies();
    const headersList = await headers();
    const userAgent = headersList.get('user-agent');
    const apiKey = getApiKey();

    if (userAgent) {
      request.headers['User-Agent'] = userAgent;
    }

    if (apiKey) {
      request.headers[API_KEY_HEADER] = apiKey;
    }

    const authHeader = headersList.get('authorization');
    const token = cookieStore.get(TOKEN_COOKIE)?.value;

    if (authHeader) {
      request.headers.Authorization = authHeader;
    } else if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API_SERVICE_SERVER.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    // Do whatever you want with the response error here:   console.log(error,"error isssssssssss here")

    // But, be SURE to return the rejected promise, so the caller still has
    // the option of additional specialized handling at the call-site:

    return Promise.reject(error);
  }
);

export default API_SERVICE_SERVER;
