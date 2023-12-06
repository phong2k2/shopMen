import { createSlice } from '@reduxjs/toolkit'

  // Define the initial state using that type
  const initialState = {
    login: {
        currentUser: null,
        isFetching: false,
        error: false,
        isLogin: false,
    },
    register: {
        isFetching: false,
        error: false,
    }
  }

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = action.payload
            state.login.error = false
            state.login.isLogin = true
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state) => {
            state.register.isFetching = false
            state.register.error = false
        },
        registerFailed: (state) => {
            state.register.isFetching = false
            state.register.error = true
            state.login.currentUser = null
        },
        logoutStart: (state) => {
            state.login.isFetching = true
        },
        logoutSuccess: (state) => {
            state.login.isFetching = false
            state.login.currentUser = null
            state.login.error = false
            state.login.isLogin = false
        },
        logoutFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        }
    }

})

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed
} = authSlice.actions

export default authSlice.reducer