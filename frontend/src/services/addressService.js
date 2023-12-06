import HttpRequest from "@/utils/httpRequest";

const axiosJWT = new HttpRequest();


// Get All Address
export const getAllAddress = async (userId) => {
    try {
        const res = await axiosJWT.get(`/users/${userId}/address`)
        return res?.data
    }catch (err) {
        console.log(err)
    }
}

// Get An Address
export const getAddressDetail = async ( addressId) => {
    try {
        const res = await axiosJWT.get(`/users/addresses/${addressId}`)
        return res?.data
    }catch(err) {
        console.log(err)
    }
}

// Get Address For Order
export const getAddressForOrder = async (userId) => {
    try {
        const res = await axiosJWT.get(`/users/${userId}/addresses/order`)
        return res?.data
    }catch(err) {
        console.log(err)
    }
}

// Add Address
export const createAddress = async ( myAddress) => {
    console.log(myAddress)
    try{
        const res = await axiosJWT.post(`/users/addresses`, myAddress)
        return res?.data
    }catch(error) {
        console.log(error)
    }
}


// Update Address
export const updateAddress = async (addressId, newAddress) => {
    try {
        const res = await axiosJWT.update(`/users/addresses/${addressId}`,newAddress)
        return res?.data
    }catch(err) {
        console.log(err);
    }
}

// Update Status Address
export const updateStatusAddress = async (addressId, status) => {
    try {
        const res = await axiosJWT.post(`/users/addresses/${addressId}/status`, {status})
        return res?.data
    }catch(err) {
        console.log(err);
    }
}

//Delete A Address
export const deleteAddress = async (addressId) => {
    try {
        const res = await axiosJWT.delete(`/users/addresses/${addressId}`)
        return res
    }catch(err) {
        console.log(err);
    }
}