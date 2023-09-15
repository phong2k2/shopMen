import { useEffect, useState} from 'react'
import * as categoryService from '@/services/adminServices/categoryService'
import { useNavigate, useParams } from 'react-router-dom';
import config from '@/config';
import Input from '@/components/Input';


function EditCate() {
    // const [cateDetail, setCateDetail] = useState<CateDetailProps | null>(null)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const { id } = useParams();
    const navigate = useNavigate()
    
    useEffect(() => {
        const editCateApi = async () => {
            try {
                if(id) {
                    const res = await categoryService.editCategory({id})
                    if(res) {
                        setDescription(res.description)
                        setName(res.name)
                    }
                }
            }catch (err) {
                console.log(err);
            }
        }
        editCateApi()
    },[])

    // const handleDescriptionCate = (e) => {
    //     setDescription(e.target.value)
    // }

    const handleNameCate = (e) => {
        setName(e.target.value)
    }

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        if(id) {
            const res = await categoryService.updateCategory({id, name, description}) 
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
            {/* <Input type={'text'} onChange={handleDescriptionCate} value={description} id={'exampleInputPassword1'} placeholder={'Chi tiết danh mục'} >Tên danh mục</Input> */}
            <button className="btn btn-primary">Hoàn Tất</button>
        </form>
    </div> 
);
}

export default EditCate;