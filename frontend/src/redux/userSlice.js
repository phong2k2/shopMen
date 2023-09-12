import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    users: {
        allUsers: null,
        isFetching: false,
        error: false,
    }
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getUsersStart: (state) => {
            state.users.isFetching = true;
        },
        getUsersSuccess: (state, action) => {
            state.users.allUsers = action.payload;
            state.users.isFetching = false;
        },
        getUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.allUsers = null;
            state.users.error = true;
        },
        deleteUsersStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUsersSuccess: (state) => {
            state.users.isFetching = false;
        },
        deleteUsersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
    }
})

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailed,
    deleteUsersStart,
    deleteUsersSuccess,
    deleteUsersFailed
} = userSlice.actions

export default userSlice.reducer