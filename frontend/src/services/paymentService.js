import HttpRequest from "@/utils/httpRequest";

const axiosJWT = new HttpRequest();

export const createPayment= async ( data) => {
    const res = await axiosJWT.post('/payments', data)
    return res?.data
}

export const getAllPayments = async () => {
    try {
        const res = await axiosJWT.get(`/payments`)
        return res?.data
    }catch(err) {
        console.log(err)
    }
}

export const getPaymentDetail = async (id) => {
    try {
        const res = await axiosJWT.get(`/payments/${id}`)
        return res?.data
    }catch(err) {
        console.log(err)
    }
}

export const getClientIdPaypal = async () => {
    try {
        const res = await axiosJWT.get('/payments/configId')
        return res?.data
    }catch (err) {
        console.log(err)
    }
}

export const updatePayment = async ( id, data) => {
    try {
        const res = await axiosJWT.update(`/payments/${id}`, data)
        return res?.data
    }catch(err) {
        console.log(err)
    }
}

export const updatePaymentStatus = async(id, newStatus) => {
    try {
        const res = await axiosJWT.post(`/payments/${id}/status`, {
            status: newStatus,
            _method: 'PATCH',
        })
        return res?.data
    }catch(err) {
        console.log(err)
    }
} 

export const deletePayment = async ( id) => {
    try {
        const res = await axiosJWT.delete(`/payments/${id}`)
        return res?.data
    }catch(err) {
        console.log(err)
    }
}