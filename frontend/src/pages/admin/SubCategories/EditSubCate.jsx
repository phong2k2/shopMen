import { useEffect, useState } from "react";
import * as subCategoryService from '@/services/subCategoryService'
import { useNavigate, useParams  } from "react-router-dom";

function EditSubCate() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [editName, setEditName] = useState('')

    useEffect(() => {
        const fetchGetDetailSubCategory = async () => {
            try {
                if(id) {
                    const res = await subCategoryService.getDetailSubCategory(id)
                    setEditName(res?.name)
                }
            }catch (err) {
                console.log(err);
            }
        }
        fetchGetDetailSubCategory()
    },[])


    const handleEditSubCate = async (e) => {
        e.preventDefault()
        try {
            await subCategoryService.editSubCategory(editName, id)
            navigate(-1)
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
                    <h4 className="card-title">Sửa danh mục con </h4>
                    <form action="" onSubmit={handleEditSubCate}  id="form-add-item" className="form-inline">
                        <div>
                        <label className="sr-only" htmlFor="inlineFormInputName2">Tên Danh Mục</label>
                        <input type="text" value={editName} name="name" onChange={(e)=> setEditName(e.target.value)} className="form-control mb-2 mr-sm-2" id="fullname" placeholder="Tên Danh Mục"/>
                        </div>
                        <button type="submit" className="btn btn-primary mb-2">Hoàn thành</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default EditSubCate;