import { useState } from "react";
import * as categoryService from '@/services/adminServices/categoryService'
import { useNavigate } from "react-router-dom";
import config from "@/config";
import Input from "@/components/Input";

function CreateCate() {
    const [name, setName] = useState('')
    const [hideSlider, setHideSlider] = useState(0)
    const navigate = useNavigate()

    const handleSubmitCreate = (e) => {
        e.preventDefault()
        const createCateApi = async () => {
            try {
                const res = await categoryService.createCategory({
                    name,
                    hideSlider
                })
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
                    <label>Hiển thị slider</label>
                    <select
                        className="form-control show-cti form-select list"
                        name="hideSlider"
                        id="cate"
                        onChange={(e) => setHideSlider(e.target.value)}
                    >
                        <option value="">Chọn hiển thị slider</option>
                        <option value="0">Ẩn</option>
                        <option value="1">Hiển thị</option>
                    </select>
                </div>
                <button className="btn btn-primary">Hoàn Tất</button>
            </form>
       </div>
    );
}

export default CreateCate;