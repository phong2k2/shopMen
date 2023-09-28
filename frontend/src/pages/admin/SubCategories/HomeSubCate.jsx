import { useEffect, useState } from "react";
import * as subCategoryService from '@/services/subCategoryService'
import { Link, useParams } from "react-router-dom";

function SubCategory() {
    const { id } = useParams()
    const [subCategory, setSubCategory] = useState([])
    const [name, setName] = useState('')
    const [newSubCate, setNewSubCate] = useState([])

    //Get SubCategory
    useEffect(() => {
        const fetchGetSubCategory = async () => {
            try {
                const res = await subCategoryService.getSubCategoryByCategory(id)
                setSubCategory(res)
            }catch(err) {
                console.log(err)
            }
        }
        fetchGetSubCategory()
    },[newSubCate])

    //Create subCategory
    const handleCreateSubCate = async (e) => {
        e.preventDefault()
        try {
            const res = await subCategoryService.createSubCategory(name, id)
            setNewSubCate(res)
        }catch(err) {
            console.error(err)
        }
    }

    //Delete SubCategory
    const handleClickDeleteSubCate = async (id) => {
        try {
            const res = await subCategoryService.deleteSubCategory(id)
            if(res) {
                const categoryAfterDelete = subCategory.filter((val) => {
                    return val._id !== id
                })
                setSubCategory(categoryAfterDelete)
            }
        }catch(err) {
            console.error(err)
        }
    }
    return ( 
    <div className="content-wrapper">
        <div className="row">
            <div className="col-12 grid-margin stretch-card">
                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">Thêm mới danh mục con của {subCategory[0]?.category?.name}</h4>
                    <form action="" onSubmit={handleCreateSubCate}  id="form-add-item" className="form-inline">
                        <div>
                        <label className="sr-only" htmlFor="inlineFormInputName2">Tên Danh Mục</label>
                        <input type="text" name="name" onChange={(e)=> setName(e.target.value)} className="form-control mb-2 mr-sm-2" id="fullname" placeholder="Tên Danh Mục"/>
                        </div>
                        <button type="submit" className="btn btn-primary mb-2">Thêm Mới</button>
                    </form>
                </div>
                </div>
            </div>
            <div className="col-lg-12 grid-margin stretch-card">
                <div className="card">
                <div className="card-body">
                    <h4 className="card-title">

                    </h4>
                    <div className="table-responsive pt-3">
                    <table id="recent-purchases-listing" className="table table-bordered">
                        <thead>
                        <tr>
                            <th>
                            #
                            </th>
                            <th>
                            Tên Danh Mục Con
                            </th>
                            {/* <th>
                            Số lượng Sản Phẩm
                            </th> */}
                            <th>
                            Hành động
                            </th>
                            
                        </tr>
                        </thead>
                        <tbody>
                        {
                            subCategory?.map((itemSubCate, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {index + 1}
                                        </td>
                                        {/* <td>

                                        </td> */}
                                        <td>
                                            {itemSubCate?.name}
                                        </td>
                                        <td >
                                            <Link to={`/admin/cate-item/edit/${itemSubCate?._id}`}><button type="button" className="btn btn-primary mr-2">Sửa</button></Link>
                                            <button onClick={()=>handleClickDeleteSubCate(itemSubCate?._id)} type="button" className="btn btn-danger">Xóa</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        
                        
                        </tbody>
                    </table>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default SubCategory;