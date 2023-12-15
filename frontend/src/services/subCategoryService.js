import HttpRequest from "@/utils/httpRequest";

const axiosJWT = new HttpRequest();


export const getAllSubCategory = async () => {
    try{
        const res = await axiosJWT.get('/subcategories')
        return res?.data
    }catch(err) {
        console.log(err)
    }
}

export const getDetailSubCategory = async (id) => {
    try{
        const res = await axiosJWT.get('/subcategories/'+ id)
        return res?.data
    }catch(err) {
        console.log(err)
    }
}


export const getSubCategoryByCategory = async (id) => {
    try {
        const res = await axiosJWT.get(`/subcategories/${id}/category`)
        return res?.data
    }catch(err) {
        console.log(err)
    }
}

export const createSubCategory = async (formData) => {
    const res = await axiosJWT.post('/subcategories', formData)
    return res?.data
}

export const updateSubCategory = async (id,
    newData,
) => {
    const res = await axiosJWT.update(`/subcategories/${id}`, newData,{
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    })
    return res?.data
}

export const deleteSubCategory = async (
    id,
    publicId,
) => {
    const res = await axiosJWT.delete(`/subcategories/${id}`, 
    {
        params: {
            publicId
        }
    })
    return res
}