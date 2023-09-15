import * as response from '@/utils/httpRequest'

export const registerUser = async ({name ,email, password, phone, image, address}) => {
    try {
        const res = await response.post('/auth/register', {
            name,
            email,
            password,
            phone,
            image,
            address
        })
        return res
    }catch(err) {
        console.log(err)
    }
}

export const loginUser = async ({email, password}) => {
    try {
        const res = await response.post('/auth/login', {
            email,
            password
        })
        return res
    }catch(err) {
        console.log(err)
    }
}

export const logOut = async (accessToken, axiosJWT) => {
    try {
        console.log(accessToken)

        const res = await axiosJWT.post('/auth/logout',null, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res
    }catch(err) {
        console.log('logOut fail')
    }
}