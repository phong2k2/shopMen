import { useEffect, useState} from 'react'
import * as categoryService from '@/services/adminServices/categoryService'
import { useNavigate, useParams } from 'react-router-dom';
import config from '@/config';
import Input from '@/components/Input';


function EditCate() {
    const [name, setName] = useState('')
    const [hideSlider, setHideSlider] = useState(0)
    const { id } = useParams();
    const navigate = useNavigate()
    
    useEffect(() => {
        const editCateApi = async () => {
            try {
                if(id) {
                    const res = await categoryService.editCategory({id})
                        setName(res?.name)
                        setHideSlider(res?.displayInSlider)
                }
            }catch (err) {
                console.log(err);
            }
        }
        editCateApi()
    },[])

    const handleNameCate = (e) => {
        setName(e.target.value)
    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        if(id) {
            const res = await categoryService.updateCategory({id, name, hideSlider}) 
            if(res) {
                navigate(config.privateRouter.indexCategory)
            }
        }
    }
    return (  
    <div className="mx-2">
        <h2>Sửa danh mục</h2>
        <form onSubmit={handleSubmitEdit}>
            <Input type={'text'} onChange={handleNameCate} value={name} id={'exampleInputEmail1'}  placeholder={'Tên danh mục'} >Tên danh mục</Input>
                <div className="form-group">
                    <label>Hiển thị slider</label>
                    <select
                        className="form-control show-cti form-select list"
                        name="hideSlider"
                        id="cate"
                        onChange={(e) => setHideSlider(e.target.value)}
                        value={hideSlider}
                    >
                        <option value="">Hiển thị slider</option>
                        <option value="0">Ẩn</option>
                        <option value="1">Hiển thị</option>
                    </select>
                </div>
            {/* <Input type={'text'} onChange={handleDescriptionCate} value={description} id={'exampleInputPassword1'} placeholder={'Chi tiết danh mục'} >Tên danh mục</Input> */}
            <button className="btn btn-primary">Hoàn Tất</button>
        </form>
    </div> 
);
}

export default EditCate;