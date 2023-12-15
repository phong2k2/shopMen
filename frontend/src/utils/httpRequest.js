import { history } from '@/helpers/history';
import { loginSuccess, logoutSuccess } from '@/redux/authSlice';
import { store } from '@/redux/store';
import axios from 'axios';

class HttpRequest {
    constructor(){
        this.httpRequest = axios.create({
            baseURL: import.meta.env.VITE_BASE_URL,
        });

        this.httpRequest.interceptors.request.use((config) => {
            const accessToken = store?.getState()?.auth?.login?.currentUser?.accessToken;
            if (accessToken) {
              config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
          return config;
        });

        this.httpRequest.interceptors.response.use(
            (response) => response,
            async (error) => {
              const originalRequest = error.config;
              const user = store.getState().auth.login.currentUser
              const dispatch = store.dispatch

              if (error.response.status === 401 ) {
                  axios.interceptors.response.eject(this.httpRequest);
                  try {
                    const response = await axios.post('http://localhost:3000/api/auth/refresh', null, {
                      withCredentials: true,
                    })
                    const responseData = response.data
                      const refreshUser = {
                        ...user,
                        accessToken: responseData.accessToken,
                      };
                    
                      dispatch(loginSuccess(refreshUser));
                      this.httpRequest.defaults.headers.common["Authorization"] =
                        responseData.accessToken;
                      originalRequest.headers["Authorization"] =
                      responseData.accessToken;
      
                      return this.httpRequest(originalRequest);
                  } catch (error) {
                    if(error?.message) {
                        dispatch(logoutSuccess())
                        history.push('/');
                    }
                  }
              }
                return Promise.reject(error);
            }
            );
          }  
    

    async get(path, options) {
        try {
            const response = await this.httpRequest.get(path, {
              ...options,
              withCredentials: true,
          });
            return response.data;
        } catch (error) {
          throw error?.response?.data
        }
    }

    async post(path, options) {
        try {
          const response = await this.httpRequest.post(path, options, {
            withCredentials: true,
        });
          return response.data;
        } catch (error) {
            throw error?.response?.data
        }
      }
    
      async update(path, options) {
        try {
          const response = await this.httpRequest.put(path, options, {
            withCredentials: true,
        });
          return response.data;
        } catch (error) {
          throw error?.response?.data
        }
      }
    
      async patch(path, options) {
        try {
          const response = await this.httpRequest.patch(path, options, {
            withCredentials: true,
        });
          return response.data;
        } catch (error) {
          throw error?.response?.data
        }
      }
    
      async delete(path, options) {
        try {
          const response = await this.httpRequest.delete(path, options, {
            withCredentials: true,
        });
          return response.data;
        } catch (error) {
          throw error?.response?.data
        }
      }
}

export default HttpRequest