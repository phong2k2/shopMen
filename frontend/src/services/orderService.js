import HttpRequest from "@/utils/httpRequest";

const axiosJWT = new HttpRequest();

export const createOrder = async (dataOrder) => {
    const res = await axiosJWT.post(`/orders`, dataOrder)
    return res?.data
    
}

export const getAllOrder = async () => {
    try {
        const res = await axiosJWT.get('/orders')
        return res?.data
    }catch (err) {
         console.log(err)
    }
} 

export const getDetailOrder = async (id) => {
    try {
        const res = await axiosJWT.get('/orders/' + id)
        console.log(res)
        return res
    }catch (err) {
         console.log(err)
    }
}

export const getAllOrderStatus = async (status) => {
    try {
        const res = await axiosJWT.get(`/orders/status/${status}`)
        return res?.data
    }catch (err) {
         console.log(err)
    }
}

export const updateStatus = async (id, newStatus) => {
    const res = await axiosJWT.post(`/orders/${id}/update-status`, {
        status: newStatus,
        _method: 'PATCH'  
    })
    return res?.data
}

export const cancerOrder = async ( id ) => {
    const res = await axiosJWT.post(`/orders/${id}/cancer`)
    return res?.data 
}

export const deleteOrder = async (id) => {
    const res = await axiosJWT.delete(`/orders/${id}`)
    return res
}