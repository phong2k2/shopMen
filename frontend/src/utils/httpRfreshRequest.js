import axios from "axios";
import axiosInstance from "./api";
import jwt_decode from 'jwt-decode';

const refreshToken = async () => {
    try {
        const res = await axios.post('http://localhost:3000/api/auth/refresh', null, {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        console.log('message:',err);
    }
};

export const createAxios = (user, dispatch, stateSuccess) => {
    axiosInstance.interceptors.request.use( async (config) => {
            if (user && user.accessToken) { 
                const decodedToken = jwt_decode(user?.accessToken);
                let date = new Date();
                if (decodedToken.exp < date.getTime() / 1000) {
                    try {
                        const data = await refreshToken();

                        const refreshUser = {
                            ...user,
                            accessToken: data.accessToken,
                        };
                        dispatch(stateSuccess(refreshUser));
                        config.headers['token'] = 'Bearer ' + data.accessToken;
                    }catch (err) {
                        console.error('Làm mới token thất bại:', err);
                    }
                }
            }
        return config;
        },
        (err) => {
            return Promise.reject(err);
        },
    )
    return axiosInstance
}


// export const createAxios = (user, dispatch, stateSuccess) => {
//     axiosInstance.interceptors.response.use( (response) => {
//             return response
//         },
//         async (err) => {
//             if(err.response.status === 404 ){
//                 try {
//                     const data = await refreshToken()
//                     const refreshUser = {
//                         ...user,
//                         accessToken: data.accessToken,
//                     };
//                     dispatch(stateSuccess(refreshUser));

//                 }catch (_error) {
//                     return Promise.reject(_error);
//                 }
//             }
//             return Promise.reject(err);
//         }
//     )
//     return axiosInstance
// }