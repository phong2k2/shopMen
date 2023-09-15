import {useState, useEffect} from 'react'
import * as productService from '@/services/adminServices/productService'
import * as categoryService from '@/services/adminServices/categoryService'
import { useNavigate, useParams } from 'react-router-dom';
import Input from '@/components/Input/Input';
import config from '@/config'


function EditProduct() {
    const [stateDetailProduct, setStateDetailProduct] = useState({
        name: '',
        category: '',
        hot: '',
        price: '',
        discount: '',
        countInStock: '',
        image: '',
        description: '',
      })
    const [listCate, setListCate] = useState([])
    const { id } = useParams();
    const navigate = useNavigate()

    console.log(stateDetailProduct)

    // Get edit product details
    useEffect(() => {
        const editProductApi = async () => {
            try {
                if(id) {
                    const res = await productService.getEditProduct(id)
                    setStateDetailProduct(res)
                }
            }catch (err) {
                console.log(err);
            }
        }
        editProductApi()
    },[])

    // Get All Category
    useEffect(() => {
        const getAllCategory = async () => {
            try {
                const res = await categoryService.indexCategory();
                if(res) {
                    setListCate(res)
                }else {
                    throw new Error
                }
            }catch (err) {
                console.log(err)
            }
        }
        getAllCategory()
    },[])

    const handleSubmitEditForm = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        const propertiesToAppend = [
          'name', 'price', 'image', 'discount',
          'countInStock', 'description', 'hot','category',
        ];
        propertiesToAppend.forEach(property => {
            formData.append(property, stateDetailProduct[property]);
        });
            try {
                console.log(formData);
               if (id ) {
                const res = await productService.updateProduct({formData, id})
                if(res) {
                    navigate(config.privateRouter.indexProduct)
                }
               }
            }catch(err) {
                console.log(err)
            }
    }

    const handleChangeEdit = (e) => {
        const type = e.target.name;
        let value;

        switch (type) {
            case "image":
            value = e.target.files[0];
            break;
            default:
            value = e.target.value;
            break;
        }
        setStateDetailProduct(prev => ({
            ...prev,
            [type]: value,
        }));
        // console.log(e.target.files[0])
        // setStateDetailProduct(prev => ({
        //     ...prev, 
        //     [e.target.name]: e.target.value
        // }))
    }

    return ( 
        <div className="mx-2">
        <form onSubmit={handleSubmitEditForm}>
           
            <Input type={'name'} onChange={handleChangeEdit} value={stateDetailProduct?.name} name={"name"} id={'exampleInputEmail1'} placeholder={'Tên sản phẩm'} >Tên sản phẩm</Input>

                <div className="form-group">
                    <label >Danh Mục</label>
                    <select
                        onChange={handleChangeEdit}
                        className="form-control show-cti form-select list"
                        name="category"
                        id="cate"
                        value={stateDetailProduct?.category}
                        >
                        <option  value="">Chọn danh mục</option>
                        {listCate.map((cate, index) => {
                            return (
                                <option key={index}  value={cate?._id}>{cate?.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label >Hot</label>
                    <select onChange={handleChangeEdit} className="form-control show-cti form-select list"  name="hot" id="cate">
                    <option value="">Chọn danh mục</option>
                    <option value="1">Bình thường</option>
                    <option value="0">Hot</option>
                    </select>
                </div>
            <Input type={'text'} onChange={handleChangeEdit} value={stateDetailProduct?.price} name={"price"} id={'exampleInputName1'} placeholder={'Giá sản phẩm'} >Giá</Input>

            <Input type={'number'} onChange={handleChangeEdit} value={stateDetailProduct?.discount} name={"discount"} id={'exampleInputName1'} placeholder={'Số tiền giảm'} >Giảm giá</Input>

            <Input type={'number'} onChange={handleChangeEdit} value={stateDetailProduct?.countInStock} name={"countInStock"} id={'exampleInputName1'} placeholder={'Số lượng sản phẩm'} >Số lượng sản phẩm</Input>

            <Input type={'file'} onChange={handleChangeEdit} name={"image"} id={'exampleInputName1'}>Số lượng sản phẩm</Input>

            <div className="form-group">
                <label>Mô tả sản phẩm</label>
                <textarea
                    id="demo summernote1"
                    onChange={handleChangeEdit}
                    value={stateDetailProduct?.description}
                    name="description" 
                    className="form-control ckeditor" 
                    required
                    ></textarea>
            </div>
            
            <button className="btn btn-primary">Sửa sản phẩm</button>
        </form>
   </div>
     );
}

export default EditProduct;