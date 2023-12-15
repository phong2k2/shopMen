import HttpRequest from "@/utils/httpRequest";
import { removeUndefinedProperties } from "@/utils/removeUndefinedProperties ";

const axiosJWT = new HttpRequest();

// Create Product
export const createProduct = async (dataProduct) => {
    const res = await axiosJWT.post('/products', dataProduct)
    return res?.data
}



// Get all products
export const getAllProducts = async ({
    pageNumber = 1,
    sortOption = ''
}) => {
    try {
        const res = await axiosJWT.get('/products', {
            params: {
                page: pageNumber,
                sort: sortOption,
            }
        })
        return res?.data
    }catch (err) {
        console.log(err);
    }
}

export const getAllProductsForHome = async () => {
    try {
        const res = await axiosJWT.get('/products/all')
        return res?.data
    }catch (err) {
        console.log(err);
    }
}


export const getProductDetail = async (slug) => {
    try {
        const res = await axiosJWT.get(`/products/${slug}`)
        return res?.data
    }catch (err) {
        console.log(err);
    }
}

//Update Product
export const updateProduct = async (
    dataProduct,
    slug,
) => {
    try {
        const res = await axiosJWT.update(`/products/${slug}`,dataProduct)
        return res?.data
    }catch(err) {
        console.log(err)
    }
}



//Delete An Product
export const deleteProduct = async (id, publicId) => {
    const res = await axiosJWT.delete(`/products/${id}`, {
        params: {
            publicId
        }
    })
    return res
}



// Get Product Details to edit
export const getProductId = async (id) => {
    try {
        const res = await axiosJWT.get(`/products/${id}`)
        return res?.data
    }catch(err) {
        console.log(err)
    }
}

// Get product by category
export const getProductByCategory = async ({slug, limit= 1, pageNumber, sortOption='default',  price_max, price_min}) => {
    try {
        const params = {
            limit,
            page: pageNumber,
            sort: sortOption,
            price_min,
            price_max
        };

        // Loại bỏ các đối số có giá trị undefined
        const processedParams = removeUndefinedProperties(params);

        const res = await axiosJWT.get(`/products/by-category/${slug}`, {
            params: processedParams
        })
        return res?.data
    }catch(err) {
        console.log(err)
    }
}

export const getProductBySubCategory = async (slug, limit) => {
    try {
        const res = await axiosJWT.get(`/products/by-sub-category/${slug}`, {
            params: {
                limit,
            }
        })
        return res?.data
    }catch(err) {
        console.log(err)
    }
}

// get All Products Related
export const getAllProductsRelated = async (categoryId, removeId, limit) => {
    try {
        const res = await axiosJWT.get(`/products/related/${categoryId}`, {
            params: {
                removeId,
                limit,
            }
        })
        return res?.data
    }catch(err) {
        console.log(err)
    }
}

//Get size 
export const getAllSize = async (id) => {
    try {
        const res = await axiosJWT.get(`/product/size/${id}`)
        return res?.data
    }catch (err) {
        console.log(err)
    }
}

export const createSizeProduct = async (formData) => {
    try {
        const res = await axiosJWT.post(`/product/createSize`, formData)
        return res?.data
    }catch (err) {
        console.log(err)
    }
}

export const deleteSize = async (id) => {
    try {
        const res = await axiosJWT.destroy(`/product/deleteSize/${id}`)
        return res
    } catch(err) {
        console.log(err)
    }
}

export const getProductSize = async (id) => {
    try {
        const res = await axiosJWT.get(`/product/size/${id}`)
        return res?.data
    }catch(err) {
        console.log(err)
    }
}