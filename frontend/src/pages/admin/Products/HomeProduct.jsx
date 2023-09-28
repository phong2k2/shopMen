import {useEffect, useState} from 'react'
import * as productService from '@/services/adminServices/productService'
import { Link } from 'react-router-dom'


function HomeProduct() {

    const [listProduct, setListProduct] = useState([])

    console.log(listProduct)
    useEffect(() => {
        const getProductApi = async () => {
            try {
                const res = await productService.getAllProducts({
                    page: 1,
                    sort: ['name', 'asc']
                })
                setListProduct(res)
            }catch (err) {
                console.log(err)
            }
        }
        getProductApi()
    },[])

    const handleDeleteProduct = async (id) => {
        try {
            const res = await productService.deleteProduct(id)
            if(res) {
                const productAfterDelete = listProduct.filter((val) => {
                    return val._id !== id
                })
                setListProduct(productAfterDelete)
            }
        }catch (err) {
            console.log(err)
        }
    }

    return ( 
        <div className='main-panel'>
            <div className='content-wrapper'>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">STT</th>
                            <th scope="col">Loại</th>
                            <th scope="col">Tên Sản phẩm</th>
                            <th scope="col">Hình ảnh</th>
                            <th rowSpan={2} scope="col">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listProduct?.map((pro, index) => {
                                console.log(pro)
                                return (
                                    <tr key={index} >
                                        <th scope="row">{index + 1}</th>
                                        <td>{pro?.subCategory?.name || pro?.category?.name}</td>
                                        <td>{pro?.name}</td>
                                        <td>
                                            <img className='img-thumbnail' src={`http://localhost:3000/${pro?.image}`} alt="" />
                                        </td>
                                        <td>
                                            <Link className='btn btn-primary mr-2' to={`/admin/variant/${pro?._id}`} >Biến Thể</Link>
                                            <Link className='btn btn-primary' to={`/admin/product/${pro._id}`} >Sửa</Link>
                                            <button className='btn btn-danger ml-2' onClick={() => handleDeleteProduct(pro?._id)}>Xóa</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
     );
}

export default HomeProduct;
