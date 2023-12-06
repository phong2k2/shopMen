import axios from "axios";
import httpRequest from "./api";

// const refreshToken = async () => {
//     try {
//         const res = await axios.post('http://localhost:3000/api/auth/refresh', null, {
//             withCredentials: true,
//         });
//         console.log(res)
//         return res?.data;
//     } catch (err) {
//         console.log('message:',err);
//     }
// };

export const createAxios = (user, dispatch, stateSuccess) => {
    const interceptor = httpRequest.interceptors.response.use(
        (response) => response,
        (error) => {
            // Reject promise if usual error
            if (error.response.status !== 401) {
                return Promise.reject(error);
            }
            // Tránh lặp lại 
            axios.interceptors.response.eject(interceptor);
           
            return axios
            .post('http://localhost:3000/api/auth/refresh', null, {
                withCredentials: true,
            }).then((response) => {
                console.log(response);
                const refreshUser = {
                        ...user,
                        accessToken: response.data.accessToken,
                    };
                    dispatch(stateSuccess(refreshUser));
                    error.response.config.headers["Authorization"] =
                        "Bearer " + response.data.accessToken;
                    
                    return axios(error.response.config);
                })
                .catch((error2) => {
                    // if (error2.response && error2.response.status === 401) {
                    //     dispatch(stateSuccess(''))
                    // }
                    console.log(error2)
                    return Promise.reject(error2.status);
                })
                .finally(createAxios); // Re-attach the interceptor by running the method
        }
    );
    return httpRequest
}