import axios from "axios"

export const getProvinces = async () => {
  try {
    const response = await axios.get("https://vapi.vnappmob.com/api/province/")
    return response?.data?.results
  } catch (err) {
    console.log(err)
  }
}

export const getDistricts = async (provinceId) => {
  try {
    const response = await axios.get(
      `https://vapi.vnappmob.com/api/province/district/${provinceId}`
    )
    return response?.data?.results
  } catch (err) {
    console.log(err)
  }
}
export const getWards = async (districtId) => {
  try {
    const response = await axios.get(
      `https://vapi.vnappmob.com/api/province/ward/${districtId}`
    )
    return response?.data?.results
  } catch (err) {
    console.log(err)
  }
}
