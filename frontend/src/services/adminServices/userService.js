// import * as response from '@/utils/httpRequest'

import { getUsersFailed } from "@/redux/userSlice";




export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/user/index', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return res.data
    }catch (err) {
        dispatch(getUsersFailed())
    }
}

export const getDetailUser = async (accessToken, id, axiosJWT) => {
    try {
        const res = await axiosJWT.get(`/user/get-details/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    }catch (err) {
        console.log(err)
    }
}

export const deleteUser = async (accessToken, id, axiosJWT) => {
    try {
        const res = await axiosJWT.delete('/user/' + id, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
         return res
    }catch (err) {
        console.log('Delete failed')
    }
}