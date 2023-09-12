import axios from "axios";

export const apiGetProvinces = async () => {
    try{
        const response = await axios.get('https://vapi.vnappmob.com/api/province/')
        return response.data.results
    }catch (err) {
        console.log(err)
    }
}

export const apiGetDistricts = async (id) => {
    try {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/district/${id}`)
        return response.data.results
    }catch (err) {
        console.log(err)
    }
}
export const apiGetWard = async (id) => {
    try {
        const response = await axios.get(`https://vapi.vnappmob.com/api/province/ward/${id}`)
        return response.data.results
    }catch (err) {
        console.log(err)
    }
}

