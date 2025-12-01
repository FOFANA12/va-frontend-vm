import { useAuthStore, useLoaderStore } from '@/store';
import axios from 'axios';
import i18n from '@/i18n';

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

// Axios config
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Accept-Language': 'fr',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const loaderStore = useLoaderStore();
    const authStore = useAuthStore();

    const token = authStore.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // JSON Content-Type sauf FormData
    if (config.data && !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }

    loaderStore.start();

    const currentLang = i18n.global.locale.value;
    config.params = config.params || {};
    config.params.locale = currentLang;


    const xsrfToken = getCookie('XSRF-TOKEN');
    if (xsrfToken) {
      config.headers['X-XSRF-TOKEN'] = xsrfToken;
    }

    return config;
  },
  (error) => {
    const loaderStore = useLoaderStore();
    loaderStore.stop();
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    const loaderStore = useLoaderStore();
    loaderStore.stop();
    return response;
  },
  async (error) => {    
    const loaderStore = useLoaderStore();
    loaderStore.stop();

    // const originalRequest = error.config;

    // if (error.response?.status === 401 && !originalRequest._retry401) {
    //   originalRequest._retry401 = true;

    //   const message = error.response?.data?.message || 'Votre session a expiré. Veuillez vous reconnecter.';

    //   window.location.href = `/login?type=error&message=${encodeURIComponent(message)}`;

    //   return Promise.reject(error);
    // }

    return Promise.reject(error);
  }
);

export default axiosInstance;
