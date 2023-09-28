import * as response from '@/utils/httpRequest'


// Get All Category
export const indexCategory = async () => {
    try {
        const res = await response.get('/category')
        return res.data
    }catch (err) {
        console.log(err)
    }
}

// Get An Category

export const getDetailsCategory = async (id) => {
    try {
        const res = await response.get('/category/'+ id)
        return res.data
    }catch(err) {
        console.log(err)
    }
}

export const getDetailCategory = async ({slug, limit, pageNumber}) => {
    try {
        const res = await response.get('/category/detail/'+ slug, {
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


// get Category Slide Home
export const getCategorySlideHome = async () => {
    try {
        const res = await response.get('/category/slide')
        return res.data
    }catch (err) {
        console.log(err);
    }
}

// Add Category
export const createCategory = async ({name, hideSlider}) => {
    try{
        const res = await response.post('/category/create', {
            name,
            displayInSlider: hideSlider
        })
        return res.data
    }catch(error) {
        console.log(error)
    }
}

// Get Category Detail  to edit
export const editCategory = async ({id}) => {
    try {
        const res = await response.get(`/category/${id}`)
        // console.log(res)
        return res.data
    }catch (err) {
        console.log(err);
    }
}

// Update Category
export const updateCategory = async ({id, name, hideSlider}) => {
    try {
        const res = await response.put(`/category/${id}`, {
            name,
            displayInSlider: hideSlider
        })
        return res.data
    }catch(err) {
        console.log(err);
    }
}

//Delete a category
export const deleteCategory = async ({id}) => {
    try {
        const res = await response.distroy(`/category/${id}`)
        return res
    }catch(err) {
        console.log(err);
    }
}