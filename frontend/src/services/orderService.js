
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

export const updateStatus = async (accessToken, id, newStatus, axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/order/${id}/status`, {
            status: newStatus,
            _method: 'PATCH'  
        } ,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data
    }catch(err) {
        console.log(err)
    }
}

export const cancerOrder = async (accessToken, id , axiosJWT) => {
    try {
        const res = await axiosJWT.post(`/order/cancer/${id}`, null,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res.data 
    }catch(err) {
        console.log(err)
    }
}

export const deleteOrder = async (accessToken, id , axiosJWT) => {
    try {
        const res = await axiosJWT.delete(`/order/delete/${id}`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return res
    }catch(err) {
        console.log(err)
    }
}