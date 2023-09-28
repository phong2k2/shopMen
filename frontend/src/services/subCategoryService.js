import * as response from '@/utils/httpRequest'


export const getDetailSubCategory = async (id) => {
    try{
        const res = await response.get('/subcategory/'+ id)
        return res.data
    }catch(err) {
        console.log(err)
    }
}


export const getSubCategoryByCategory = async (id) => {
    try {
        const res = await response.get('/subcategory/category/'+ id)
        return res.data
    }catch(err) {
        console.log(err)
    }
}

export const createSubCategory = async (name, id, hideSlider) => {
    try {
        const res = await response.post('/subcategory/create', {
            name,
            category: id,
            displayInSlider: hideSlider
        })
        return res.data
    }catch(err) {
        console.log(err)
    }
}

export const editSubCategory = async (name, id) => {
    try {
        const res = await response.put('/subcategory/'+id, {
            name,
        })
        return res.data
    }catch(err) {
        console.log(err)
    }
}

export const deleteSubCategory = async (id) => {
    try {
        const res = await response.distroy('/subcategory/'+id)
        return res
    }catch(err) {
        console.log(err)
    }
}