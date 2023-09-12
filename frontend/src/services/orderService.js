
export const createOrder = async (accessToken, formData, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/order/create`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
        
        )
        return res.data
    }catch (err) {
        console.log(err)
    }
}

export const getAllOrder = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/order/get-all-order', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    }catch (err) {
         console.log(err)
    }
} 

export const getDetailOrder = async (accessToken, id, axiosJWT) => {
    try {
        const res = await axiosJWT.get('/order/get-details-order/' + id, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    }catch (err) {
         console.log(err)
    }
}