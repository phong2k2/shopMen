import axios from "axios";

export const getProvinces = async () => {
    try{
        const response = await axios.get('https://provinces.open-api.vn/api/')
        return response?.data
    }catch (err) {
        console.log(err)
    }
}

export const getDistricts = async (idDistrict) => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/p/${idDistrict}`, {
            params: {
                depth: 2
            }
        })
        return response?.data
    }catch (err) {
        console.log(err)
    }
}
export const getWards = async (idWard) => {
    try {
        const response = await axios.get(`https://provinces.open-api.vn/api/d/${idWard}`, {
            params: {
                depth: 2 
            }
        })
        return response?.data
    }catch (err) {
        console.log(err)
    }
}

