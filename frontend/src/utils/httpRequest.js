import axios from "axios";
import { history } from "@/helpers/history";
import { loginSuccess, logoutSuccess } from "@/redux/authSlice";
import { store } from "@/redux/store";
import { API_ENDPOINT } from "./constants";

class HttpRequest {
  constructor() {
    this.httpRequest = axios.create({
      baseURL: API_ENDPOINT,
    });

    this.httpRequest.interceptors.request.use((config) => {
      const accessToken = store?.getState()?.auth?.login?.tokens;
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    });

    this.httpRequest.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const user = store.getState().auth.login.currentUser;
        const dispatch = store.dispatch;

        if (error.response && error.response.status === 401) {
          if (
            error.response &&
            error.response.status === 401 &&
            error.response.data.message === "The token has expired"
          ) {
            axios.interceptors.response.eject(this.httpRequest);
            try {
              const response = await axios.post(
                "http://localhost:3000/v1/auth/refresh",
                null,
                {
                  withCredentials: true,
                }
              );
              const responseData = response.data;
              const refreshUser = {
                data: user,
                meta: responseData,
              };

              dispatch(loginSuccess(refreshUser));
              this.httpRequest.defaults.headers.common["Authorization"] =
                responseData.accessToken;
              originalRequest.headers["Authorization"] =
                responseData.accessToken;

              return this.httpRequest(originalRequest);
            } catch (error) {
              if (error?.message) {
                dispatch(logoutSuccess());
                history.push("/");
              }
            }
          } else {
            dispatch(logoutSuccess());
            history.push("/");
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async get(path, params) {
    try {
      const response = await this.httpRequest.get(path, {
        params,
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async post(path, params) {
    try {
      const response = await this.httpRequest.post(path, params, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async update(path, params) {
    try {
      const response = await this.httpRequest.put(path, params, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async patch(path, params) {
    try {
      const response = await this.httpRequest.patch(path, params, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }

  async delete(path, params) {
    try {
      const response = await this.httpRequest.delete(path, params, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error?.response?.data;
    }
  }
}

export default HttpRequest;
