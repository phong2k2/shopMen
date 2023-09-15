import * as response from '@/utils/httpRequest'



// Get all products
export const getAllProducts = async ({
    page,
    sort
}) => {
    try {
        const res = await response.get('/admin/product', {
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


// Product by category
// export const getProductByCategory = async ({slug}) => {
//     try {
//         const res = await response.get('/admin/product/collections/'+ slug)
//         return res.data
//     }catch (err) {
//         console.log(err);
//     }
// }

export const getProductDetail = async ({slug}) => {
    
    try {
        const res = await response.get(`/admin/product/product-detail/${slug}`)
        return res.data
    }catch (err) {
        console.log(err);
    }
}
// Add Product
// export const createProduct = async ({
//     name,
//     price,
//     discount,
//     file ,
//     countInStock,
//     description,
//     hot
// }) => {
//     try {
//         const res = await response.post('/admin/product/create', {
//             name,
//             price,
//             discount,
//             image: file,
//             countInStock,
//             description,
//             hot,
//         })
//         console.log('error', res)
//         return res.data
//     }catch (err) {
//         console.log(err)
//     }
// }
export const createProduct = async (formData) => {
    console.log(formData)

    try {
        const res = await response.post('/admin/product/create', formData)
        return res.data
    }catch (err) {
        console.log(err)
    }
}
// Get Product Details to edit
export const getEditProduct = async (id) => {
    try {
        const res = await response.get(`/admin/product/productdetail/${id}`)
        console.log(res)
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
        const res = await response.post(`/admin/product/${id}`,formData,{
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
        const res = await response.distroy(`/admin/product/${id}`)
        return res.data
    }catch(err) {
        console.log(err)
    }
}
