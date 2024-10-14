import axios from "axios"
import { history } from "@/helpers/history"
import { loginSuccess, logoutSuccess } from "@/redux/authSlice"
import { store } from "@/redux/store"
import { BASE_URL, SERVER_ERROR, UNAUTHORIZED } from "./constants"

class HttpRequest {
  constructor() {
    this.httpRequest = axios.create({
      baseURL: BASE_URL
    })

    this.httpRequest.interceptors.request.use((config) => {
      const accessToken = store?.getState()?.auth?.login?.tokens
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`
      }
      return config
    })

    this.httpRequest.interceptors.response.use(
      this.handleSuccess,
      this.handleError
    )
  }

  handleSuccess = (response) => response

  handleError = async (error) => {
    const originalRequest = error.config
    const user = store.getState().auth.login.currentUser
    const dispatch = store.dispatch

    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "The token has expired"
    ) {
      axios.interceptors.response.eject(this.httpRequest)
      try {
        const response = await axios.post(`${BASE_URL}/v1/auth/refresh`, null, {
          withCredentials: true
        })
        const responseData = response.data
        const refreshUser = {
          data: user,
          meta: responseData
        }

        dispatch(loginSuccess(refreshUser))
        this.httpRequest.defaults.headers.common["Authorization"] =
          responseData.accessToken
        originalRequest.headers["Authorization"] = responseData.accessToken

        return this.httpRequest(originalRequest)
      } catch (error) {
        dispatch(logoutSuccess())
        history.push("/")
      }
    }
    const { status } = error.response

    switch (status) {
      case UNAUTHORIZED:
        dispatch(logoutSuccess())
        break
      case SERVER_ERROR:
        setTimeout(() => dispatch(logoutSuccess()), 1000)
        history.push("/404")
        break
      default:
        break
    }
    return Promise.reject(error)
  }

  async get(path, params) {
    try {
      const response = await this.httpRequest.get(path, {
        params,
        withCredentials: true
      })

      return response.data
    } catch (error) {
      throw error?.response?.data
    }
  }

  async post(path, params) {
    try {
      const response = await this.httpRequest.post(path, params, {
        withCredentials: true
      })
      return response.data
    } catch (error) {
      throw error?.response?.data
    }
  }

  async update(path, params) {
    try {
      const response = await this.httpRequest.put(path, params, {
        withCredentials: true
      })
      return response.data
    } catch (error) {
      throw error?.response?.data
    }
  }

  async patch(path, params) {
    try {
      const response = await this.httpRequest.patch(path, params, {
        withCredentials: true
      })
      return response.data
    } catch (error) {
      throw error?.response?.data
    }
  }

  async delete(path, params) {
    try {
      const response = await this.httpRequest.delete(path, params, {
        withCredentials: true
      })
      return response.data
    } catch (error) {
      throw error?.response?.data
    }
  }
}

export default new HttpRequest()
