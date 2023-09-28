import { useState, useEffect } from "react";
import * as productService from "@/services/adminServices/productService";
import * as categoryService from "@/services/adminServices/categoryService";
import * as subCategoryService from "@/services/subCategoryService"
import { useNavigate } from "react-router-dom";
import config from "@/config";
import Input from "@/components/Input";


function CreateProduct() {
    const [listCate, setListCate] = useState([]);
    const [stateProduct, setStateProduct] = useState("");
    const navigate = useNavigate()
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [subCategory, setSubCategory] = useState([])

    // console.log('stateProduct',stateProduct)

  // Add Product
  const handleCreateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData()
    for( let name in stateProduct) {
      formData.append(name, stateProduct[name]);
    }

    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });
    const createProductApi = async () => {
      try {
        const res = await productService.createProduct(formData);
        if(res) {
          navigate(config.privateRouter.indexProduct)
        }
      } catch (err) {
        console.log(err);
      }
    };
    createProductApi();
  };

  // Get All Category
    useEffect(() => {
      const getAllCategory = async () => {
        try {
          const res = await categoryService.indexCategory();
          
          if (res) {
            setListCate(res);
          } 
        } catch (err) {
          console.log(err);
        }
      };
      getAllCategory();
    }, []);

    //Get Subcategory
    useEffect(() => {
      const fetchGetSubCategory = async () => {
        try {
          const res = await subCategoryService.getSubCategoryByCategory(selectedCategoryId)
          setSubCategory(res)
        }catch (err) {
          console.log(err)
        }
      } 
      fetchGetSubCategory()
    },[selectedCategoryId])
    
  // Lấy data từ form
  const handleOnchangeInformation = (e) => {
    const type = e.target.name;
    let value;

    switch (type) {
      case "image":
        // value = Array.from(e.target.files);
        value = e.target.files[0];
        break;
      case "category":
        setSelectedCategoryId(e.target.value)
        value = e.target.value;
        break
      default:
        value = e.target.value;
        break;
    }
    setStateProduct({
      ...stateProduct,
      [type]: value,
    });
  };
  return (
    <div className="container mx-2">
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="">
            <div className="">
              <h4 className="card-title">Thêm Sản Phẩm</h4>
              <p className="card-description">
                Nhập thông tin
              </p>
            </div>
          </div>
          <form onSubmit={handleCreateProduct} encType="multipart/form-data" className="h-100">
            <Input type={'text'} onChange={handleOnchangeInformation} name={"name"} id={'exampleInputEmail1'} placeholder={'Tên sản phẩm'} >Tên Sản phẩm</Input>
            <div className="form-group">
              <label>Danh Mục</label>
              <select
                onChange={handleOnchangeInformation}
                className="form-control show-cti form-select list"
                name="category"
                id="cate"
              >
                <option value="">Chọn danh mục</option>
                {listCate?.map((cate, index) => {
                  return (
                    <option key={index} value={cate?._id}>
                      {cate?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Danh Mục Con</label>
              <select
                onChange={handleOnchangeInformation}
                className="form-control show-cti form-select list"
                name="subCategory"
                id="cate"
              >
                <option value="">Chọn danh mục con</option>
                {subCategory?.map((cate, index) => {
                  return (
                    <option key={index} value={cate?._id}>
                      {cate?.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>Hot</label>
              <select
                onChange={handleOnchangeInformation}
                className="form-control show-cti form-select list"
                name="hot"
                id="cate"
              >
                <option value="">Chọn danh mục</option>
                <option value="0">Hot</option>
                <option value="1">Bình thường</option>
              </select>
            </div>

            <Input type={'text'} onChange={handleOnchangeInformation} name={"price"} id={'exampleInputName1'} placeholder={'Giá sản phẩm'} >Giá</Input>

            <Input type={'number'} onChange={handleOnchangeInformation} name={"discount"} id={'exampleInputName1'} placeholder={'Số tiền giảm giá'} >Giảm giá</Input>

            {/* <div className="form-group">
              <label>Số lượng</label>
              <input
                type="number"
                onChange={handleOnchangeInformation}
                name="countInStock"
                className="form-control amount"
                id="exampleInputName1"
                placeholder="Nhập số lượng"
              />
            </div> */}
            <Input type={'number'} onChange={handleOnchangeInformation} name={"countInStock"} id={'exampleInputName1'} placeholder={'Số lượng sản phẩm'} >Số lượng</Input>

            <Input type={'file'} name={'image'}  multiple={'multiple'} onChange={handleOnchangeInformation}>Hình Ảnh</Input>

            <div className="form-group">
              <label>Mô tả sản phẩm</label>
              <textarea
                id="demo summernote1"
                onChange={handleOnchangeInformation}
                name="description"
                className="form-control ckeditor"
                required
              ></textarea>
            </div>

            {/* Ảnh thêm  */}
                {/* <p>
                  <a className="btn btn-primary col-sm-3 mr-3" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Thêm ảnh sản phẩm</a>
                  <a className="btn btn-primary col-sm-3" data-toggle="collapse" href="#multiCollapseExample2" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Thêm kích thước sản phẩm</a>
                </p>
                <div className="collapse" id="multiCollapseExample1">
                  <div className="card card-body">
                  <div className="form-group">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                              <label form="exampleSelectGender">Màu sắc</label>
                              <input type="text" onChange={handleOnchangeInformation} name="color" className="form-control "  placeholder=""/>                         
                          </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label form="exampleSelectGender">Hình ảnh</label>
                                <input type="file" onChange={handleOnchangeInformation} name="image_color" multiple className="form-control avatar"/>                    
                            </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                              <label form="exampleSelectGender">Giá thêm </label>
                              <input type="text" name="price_memory"className="form-control" onChange={handleOnchangeInformation}  id="exampleInputName1" placeholder="Nhập giá bán"/>                         
                          </div>
                        </div>
                      </div>
                    </div> 
                  </div>
                </div>
                
                <div className="collapse mt-3" id="multiCollapseExample2">
                  <div className="card card-body">
                  <div className="form-group">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                              <label form="exampleSelectGender">Size</label>
                              <input type="text" name="size"  onChange={handleOnchangeInformation}  className="form-control "  placeholder=""/>                         
                          </div>
                        </div>
                        
                      </div>
                    </div> 
                  </div>
                </div> */}

            <button className="btn btn-primary p-2">Thêm sản phẩm</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
