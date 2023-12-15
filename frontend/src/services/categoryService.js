import HttpRequest from "@/utils/httpRequest";

const axiosJWT = new HttpRequest();


// Get All Category
export const getAllCategory = async () => {
    try {
        const res = await axiosJWT.get('/categories')
        return res?.data
    }catch (err) {
        console.log(err)
    }
}

// Get An Category

export const getDetailCategoryId = async (id) => {
    try {
        const res = await axiosJWT.get(`/categories/${id}`)
        return res?.data
    }catch(err) {
        console.log(err)
    }
}

export const getDetailCategory = async (slug) => {
    try {
        const res = await axiosJWT.get(`/categories/${slug}`)
        return res?.data
    }catch (err) {
        console.log(err);
    }
}


// get Category Slide Home
export const getCategorySlideHome = async () => {
    try {
        const res = await axiosJWT.get('/categories/slide')
        return res?.data
    }catch (err) {
        console.log(err);
    }
}

// Add Category
export const createCategory = async (values) => {
    try{
        const res = await axiosJWT.post('/categories', values)
        return res?.data
    }catch(error) {
        console.log(error)
    }
}

// Get Category Detail  to edit
export const getCategoryDetail = async (id) => {
    try {
        const res = await axiosJWT.get(`/categories/${id}`)
        // console.log(res)
        return res?.data
    }catch (err) {
        console.log(err);
    }
}

// Update Category
export const updateCategory = async ({id, newData}) => {
    try {
        const res = await axiosJWT.update(`/categories/${id}`, newData)
        return res?.data
    }catch(err) {
        console.log(err);
    }
}

//Delete a category
export const deleteCategory = async (id) => {
    const res = await axiosJWT.delete(`/categories/${id}`)
    return res
}