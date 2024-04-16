import axios from "axios";

export const getProvinces = async () => {
    try{
        const response = await axios.get('https://vnprovinces.pythonanywhere.com/api/provinces/?limit=100')
        return response?.data?.results
    }catch (err) {
        console.log(err)
    }
}

export const getDistricts = async (provinceId) => {
    try {
        const response = await axios.get(`https://vnprovinces.pythonanywhere.com/api/districts/?province_id=${provinceId}&limit=100`)
        return response?.data?.results
    }catch (err) {
        console.log(err)
    }
}
export const getWards = async (provinceId) => {
    try {
        const response = await axios.get(`https://vnprovinces.pythonanywhere.com/api/wards/?province_id=${provinceId}&limit=100`,)
        return response?.data?.results
    }catch (err) {
        console.log(err)
    }
}

