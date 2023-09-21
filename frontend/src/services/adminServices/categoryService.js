import * as response from '@/utils/httpRequest'


// Get All Category
export const indexCategory = async () => {
    try {
        const res = await response.get('/admin/category')
        return res.data
    }catch (err) {
        console.log(err)
    }
}

// Get An Category

export const getDetailsCategory = async (id) => {
    try {
        const res = await response.get('/admin/category/'+ id)
        return res.data
    }catch(err) {
        console.log(err)
    }
}

export const getDetailCategory = async ({slug, limit, pageNumber}) => {
    try {
        const res = await response.get('/admin/category/detail/'+ slug, {
            params: {
                limit,
                page: pageNumber
            }
        })
        return res
    }catch (err) {
        console.log(err);
    }
}

// Add Category
export const createCategory = async ({name, hot}) => {
    try{
        const res = await response.post('/admin/category/create', {
            name,
            hot
        })
        // console.log(res)
        return res.data
    }catch(error) {
        console.log(error)
    }
}

// Get Category Detail  to edit
export const editCategory = async ({id}) => {
    try {
        const res = await response.get(`/admin/category/${id}`)
        // console.log(res)
        return res.data
    }catch (err) {
        console.log(err);
    }
}

// Update Category
export const updateCategory = async ({id, name, description}) => {
    try {
        const res = await response.put(`/admin/category/${id}`, {
            name,
            description
        })
        return res.data
    }catch(err) {
        console.log(err);
    }
}

//Delete a category
export const deleteCategory = async ({id}) => {
    try {
        const res = await response.distroy(`/admin/category/${id}`)
        return res
    }catch(err) {
        console.log(err);
    }
}