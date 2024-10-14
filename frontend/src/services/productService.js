import HttpRequest from "@/utils/httpRequest"
import { removeUndefinedProperties } from "@/utils/removeUndefinedProperties "

// Create Product
export const createProduct = async (dataProduct) => {
  const res = await HttpRequest.post("/v1/products", dataProduct)
  return res?.data
}

// Get all products
export const getAllProducts = async (params) => {
  try {
    const res = await HttpRequest.get("/v1/products", params)
    return res
  } catch (error) {
    throw error
  }
}

export const getProductDetail = async (productId) => {
  const res = await HttpRequest.get(`/v1/products/${productId}`)
  return res?.data
}

export const getProductDetailByAdmin = async (productId) => {
  const res = await HttpRequest.get(`/admin/products/${productId}`)
  return res?.data
}

export const getAllProductsForHome = async () => {
  try {
    const res = await HttpRequest.get("/v1/products/all")
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

//Update Product
export const updateProduct = async (dataProduct, slug) => {
  try {
    const res = await HttpRequest.update(`/v1/products/${slug}`, dataProduct)
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

//Delete An Product
export const deleteProduct = async (id, publicId) => {
  const res = await HttpRequest.delete(`/v1/products/${id}`, {
    params: {
      publicId
    }
  })
  return res
}

// Get Product Details to edit
export const getProductId = async (id) => {
  try {
    const res = await HttpRequest.get(`/products/${id}`)
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

// Get product by category
export const getProductByCategory = async ({
  slug,
  limit = 1,
  pageNumber,
  sortOption = "default",
  price_max,
  price_min
}) => {
  try {
    const params = {
      limit,
      page: pageNumber,
      sort: sortOption,
      price_min,
      price_max
    }

    const processedParams = removeUndefinedProperties(params)
    const res = await HttpRequest.get(`/v1/products/by-category/${slug}`, {
      params: processedParams
    })
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

export const getProductBySubCategory = async (slug, limit) => {
  try {
    const res = await HttpRequest.get(`/v1/products/by-sub-category/${slug}`, {
      params: {
        limit
      }
    })
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

// get All Products Related
export const getAllProductsRelated = async (id) => {
  try {
    const res = await HttpRequest.get(`/v1/products?category=${id}&limit=4`)
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

//Get size
export const getAllSize = async (id) => {
  try {
    const res = await HttpRequest.get(`/v1/product/size/${id}`)
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

export const createSizeProduct = async (formData) => {
  try {
    const res = await HttpRequest.post(`/v1/product/createSize`, formData)
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

export const deleteSize = async (id) => {
  try {
    const res = await HttpRequest.destroy(`/v1/product/deleteSize/${id}`)
    return res
  } catch (err) {
    console.log(err)
  }
}

export const getProductSize = async (id) => {
  try {
    const res = await HttpRequest.get(`/v1/product/size/${id}`)
    return res?.data
  } catch (err) {
    console.log(err)
  }
}
