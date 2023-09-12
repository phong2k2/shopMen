import {useEffect, useState} from 'react'
import * as productService from '@/services/adminServices/productService'
import { Link } from 'react-router-dom'


function HomeProduct() {

    const [listProduct, setListProduct] = useState([])

    useEffect(() => {
        const getProductApi = async () => {
            try {
                const res = await productService.getAllProducts({
                    page: 1,
                    sort: ['name', 'asc']
                })
                if(res) {
                    setListProduct(res)
                }
            }catch (err) {
                console.log(err)
            }
        }
        getProductApi()
    },[])

    const handleDeleteProduct = async (id) => {
        try {
            const res = await productService.deleteProduct(id)
            console.log(res)
            window.location.href = '/admin/product/index'
        }catch (err) {
            console.log(err)
        }
    }

    return ( 
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên Sản phẩm</th>
                    <th scope="col">Hình ảnh</th>
                    <th rowSpan={2} scope="col">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {
                    listProduct.map((pro, index) => {
                    return (
                        <tr key={index} >
                            <th scope="row">{index + 1}</th>
                            <td>{pro?.name}</td>
                            <td>
                                <img className='w-25' src={pro?.image} alt="" />
                            </td>
                            <td>
                                <Link to={`/admin/product/${pro._id}`} >Sửa</Link>
                                <button onClick={() => handleDeleteProduct(pro?._id)}>Xóa</button>
                            </td>
                        </tr>
                    )
                    })
                }
            </tbody>
        </table>
     );
}

export default HomeProduct;
