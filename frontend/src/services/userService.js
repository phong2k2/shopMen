
import HttpRequest from "@/utils/httpRequest";

const axiosJWT = new HttpRequest();

export const getAllUsers = async () => {
    try {
        const res = await axiosJWT.get('/users');
        return res?.data
    }catch (err) {
        console.error(err)
    }
}


export const getMe = async () => {
    const res = await axiosJWT.get('/users/me')
    return res
}

export const getDetailUser = async (id) => {
    try {
        const res = await axiosJWT.get(`/users/${id}`)
        return res?.data
    }catch (err) {
        console.log(err)
    }
}


export const updateUser = async (formData, id) => {
    try{
        const res = await axiosJWT.put(`users/${id}`, formData)
    return res?.data
    }catch (err) {
        console.log(err)
    }
}

export const deleteUser = async (id) => {
    const res = await axiosJWT.delete('/users/' + id)
    return res
}