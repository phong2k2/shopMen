import * as response from '@/utils/httpRequest'

// Create Product
export const createProduct = async (formData) => {

    try {
        const res = await response.post('/product/create', formData)
        return res.data
    }catch (err) {
        console.log(err)
    }
}



// Get all products
export const getAllProducts = async ({
    page,
    sort
}) => {
    try {
        const res = await response.get('/product', {
            params: {
                page,
                sort,
            }
        })
        return res.data
    }catch (err) {
        console.log(err);
    }
}



export const getProductDetail = async ({slug}) => {
    
    try {
        const res = await response.get(`/product/product-detail/${slug}`)
        return res.data
    }catch (err) {
        console.log(err);
    }
}

// Get Product Details to edit
export const getProductId = async (id) => {
    try {
        const res = await response.get(`/product/product-detailId/${id}`)
        return res.data
    }catch(err) {
        console.log(err)
    }
}

// Get product by category
export const getProductByCategory = async (slug, limit, pageNumber) => {
    try {
        const res = await response.get(`/product/category/${slug}`, {
            params: {
                limit,
                page: pageNumber
            }
        })
        return res.data
    }catch(err) {
        console.log(err)
    }
}

export const getProductBySubCategory = async (slug, limit, pageNumber) => {
    try {
        const res = await response.get(`/product/sub-category/${slug}`, {
            params: {
                limit,
                page: pageNumber
            }
        })
        return res.data
    }catch(err) {
        console.log(err)
    }
}
//Update Product
export const updateProduct = async ({
    formData, id
}) => {
    try {
        const res = await response.put(`/product/${id}`,formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        return res.data
    }catch(err) {
        console.log(err)
    }
}

//Delete An Product
export const deleteProduct = async (id) => {
    try {
        const res = await response.distroy(`/product/${id}`)
        return res
    }catch(err) {
        console.log(err)
    }
}




// Create product color
export const createColorProduct = async (formData) => {
    try {
        const res = await response.post(`/product/createColor`, formData)
        return res.data
    }catch (err) {
        console.log(err)
    }
}

// Get Product color
export const getAllColor = async (id) => {
    try {
        const res = await response.get(`/product/color/${id}`)
        return res.data
    }catch (err) {
        console.log(err)
    }
}

//Delete color
export const deleteColor = async (id) => {
    try {
        const res = await response.distroy(`admin/product/deleteColor/${id}`)
        return res
    }catch(err) {
        console.log(err)
    }
}

//Get size 
export const getAllSize = async (id) => {
    try {
        const res = await response.get(`/product/size/${id}`)
        return res.data
    }catch (err) {
        console.log(err)
    }
}

export const createSizeProduct = async (formData) => {
    try {
        const res = await response.post(`/product/createSize`, formData)
        return res.data
    }catch (err) {
        console.log(err)
    }
}

export const deleteSize = async (id) => {
    try {
        const res = await response.distroy(`/product/deleteSize/${id}`)
        return res
    } catch(err) {
        console.log(err)
    }
}

export const getProductColor = async (id) => {
    try {
        const res = await response.get(`/product/color/${id}`)
        return res.data
    }catch(err) {
        console.log(err)
    }
}

export const getProductSize = async (id) => {
    try {
        const res = await response.get(`/product/size/${id}`)
        return res.data
    }catch(err) {
        console.log(err)
    }
}