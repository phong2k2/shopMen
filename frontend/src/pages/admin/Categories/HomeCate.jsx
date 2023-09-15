import { useEffect, useState} from 'react'
import * as categoryService from '@/services/adminServices/categoryService'
import { Link } from 'react-router-dom'

function HomeCate() {
   
    const [listCate, setListCate] = useState([])

    useEffect(() => {
        const indexCategoryApi = async () => {
            try {
                const res = await categoryService.indexCategory();
                if(res) {
                    setListCate(res)
                }
            }catch (err) {
                console.log(err)
            }
        }
        indexCategoryApi()
    },[])


    //Delete Category
    const handleDeleteCate = async (id) => {
        try{
            if(id) {
                const res = await categoryService.deleteCategory({id})
                setListCate(res)
                window.location.reload()
            }
        }catch(err) {
            console.log(err)
        }
    }

    return(
    <table className="table table-hover">
        <thead>
            <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên danh mục</th>
                <th rowSpan={2} scope="col">Hành động</th>
            </tr>
        </thead>
        <tbody>
            {
                listCate.map((cate, index) => {
                return (
                    <tr key={index} >
                        <th scope="row">{index + 1}</th>
                        <td>{cate?.name}</td>
                        <td>
                            <Link className='btn btn-primary' to={`/admin/category/${cate._id}`} >Sửa</Link>
                            <button className='btn btn-danger ml-3' onClick={() => handleDeleteCate(cate?._id)} >Xóa</button>
                        </td>
                    </tr>
                )
                })
            }
        </tbody>
    </table>
   )   
}

export default HomeCate