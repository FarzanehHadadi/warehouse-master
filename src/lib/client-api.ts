import axios, { AxiosError } from 'axios';
import axiosRetry from 'axios-retry';
// import { logoutFromApp } from '../utils/logout';
// import { authenticateWithRefreshToken } from '../utils/refresh-token';
// import { getCookie } from 'cookies-next';

// export const token = getCookie('token');

let abortController = new AbortController();
let isRefreshing = false;

const API_SERVICE_CLIENT = axios.create({
  baseURL: '/api/',
  headers: {
    'Access-Control-Allow-Origin': 'true',
    'Access-Control-Allow-Methods': 'GET,DELETE,PATCH,POST,PUT',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': '*',
  },
  withCredentials: true,
  proxy: false,
  signal: abortController.signal,
});

axiosRetry(API_SERVICE_CLIENT, {
  retries: 1,
  retryDelay: (retryCount) => {
    return retryCount * 3000;
  },
  retryCondition: (error: AxiosError) => {
    if (error.response?.status === 400 || error.response?.status === 401) {
      return false;
    }
    return true;
  },
});

API_SERVICE_CLIENT.interceptors.request.use(
  (request: any) => {
    request.params = { ...request.params };
    return request;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  config: any;
}> = [];

const processQueue = (error: any | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(API_SERVICE_CLIENT(p.config));
  });
  failedQueue = [];
};

API_SERVICE_CLIENT.interceptors.response.use(
  (response: any) => {
    return response;
  },
  async (error: any) => {
    const originalRequest = error?.config;
    if (error?.response?.status === 401 && originalRequest) {
      if (originalRequest._retry) {
        abortController.abort();
        abortController = new AbortController();
        // logoutFromApp();
        window.location.replace('/auth/login');
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        isRefreshing = false;
        // await authenticateWithRefreshToken();
        processQueue(null);
        return API_SERVICE_CLIENT(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);
        abortController.abort();
        abortController = new AbortController();
        // logoutFromApp();
        window.location.replace('/auth/login');
        return Promise.reject(refreshError);
      }
    }

    // await CatcherServerApi(error);
    return Promise.reject(error);
  }
);

export default API_SERVICE_CLIENT;

// const CatcherServerApi = async (error: unknown) => {
//   if (error instanceof AxiosError) {
//     const newCase = error?.response?.status || (error as any).status;
//     switch (newCase) {
//       case 400:
//         const handelMessage = error.response?.data?.error?.code;
//         switch (handelMessage) {
//           case 1000:
//             toast.error(
//               error?.response?.data?.error?.message
//                 ? error?.response?.data?.error?.message
//                 : error?.response?.data?.error?.title
//             );
//             break;
//           case 1100:
//             toast.warning(
//               error?.response?.data?.error?.message
//                 ? error?.response?.data?.error?.message
//                 : error?.response?.data?.error?.title
//             );
//             break;
//           case 1200:
//             toast.error(
//               error?.response?.data?.error?.message
//                 ? error?.response?.data?.error?.message
//                 : error?.response?.data?.error?.title
//             );
//             break;
//           case 1201:
//             toast.error(
//               error?.response?.data?.error?.message
//                 ? error?.response?.data?.error?.message
//                 : error?.response?.data?.error?.title
//             );
//             break;
//           case 1202:
//             toast.warning(
//               error?.response?.data?.error?.message
//                 ? error?.response?.data?.error?.message
//                 : error?.response?.data?.error?.title
//             );
//             break;
//           case 1300:
//             toast.warning(
//               error?.response?.data?.error?.message
//                 ? error?.response?.data?.error?.message
//                 : error?.response?.data?.error?.title
//             );
//             break;
//           default: {
//             toast.error(
//               error?.response?.data?.error?.message
//                 ? error?.response?.data?.error?.message
//                 : error?.response?.data?.error?.title
//             );
//             break;
//           }
//         }
//         break;
//       case 403:
//         toast.error(
//           error?.response?.data?.error?.message
//             ? error?.response?.data?.error?.message
//             : error?.response?.data?.error?.title
//         );
//         break;
//       case 404:
//         toast.error(
//           error?.response?.data?.error?.message
//             ? error?.response?.data?.error?.message
//             : error?.response?.data?.error?.title
//         );
//         break;
//       case 500:
//         toast.error(error?.response?.data?.error?.message);
//         break;
//       case 502:
//         toast.error(
//           error?.response?.data?.error?.message
//             ? error?.response?.data?.error?.message
//             : error?.response?.data?.error?.title
//         );
//         break;
//       default: {
//         toast.error(
//           error?.response?.data?.error?.message
//             ? error?.response?.data?.error?.message
//             : error?.response?.data?.error?.title
//         );
//         break;
//       }
//     }
//   } else return 'Error';
// };
