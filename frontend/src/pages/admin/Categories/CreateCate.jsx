import { useState } from "react";
import * as categoryService from '@/services/adminServices/categoryService'
import { useNavigate } from "react-router-dom";
import config from "@/config";
import Input from "@/components/Input";

function CreateCate() {
    const [name, setName] = useState('')
    const [hot, setHot] = useState('')
    const navigate = useNavigate()
    const handleSubmitCreate = (e) => {
        e.preventDefault()
        const createCateApi = async () => {
            try {
                const res = await categoryService.createCategory({
                    name,
                    hot
                })
                console.log(res)
                if(res) {
                    navigate(config.privateRouter.indexCategory)
                }
                
            }catch (err) {
                console.log(err);
            }
        }
        createCateApi();
    }
    return ( 
       <div className="mx-2">
            <form onSubmit={handleSubmitCreate}>
                <Input type={'text'} onChange={(e) => setName(e.target.value)} id={'exampleInputEmail1'} placeholder={'Nhập tên danh mục'} >Tên danh mục</Input>
                <div className="form-group">
                    <label>Hot</label>
                    <select
                        onChange={(e) => setHot(e.target.value)}
                        className="form-control show-cti form-select list"
                        name="hot"
                        id="cate"
                    >
                        <option value="">Chọn</option>
                        <option value="0">Hot</option>
                        <option value="1">Bình thường</option>
                    </select>
                </div>
                <button className="btn btn-primary">Submit</button>
            </form>
       </div>
    );
}

export default CreateCate;