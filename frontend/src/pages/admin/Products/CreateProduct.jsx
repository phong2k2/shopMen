import { useState, useEffect } from "react";
import * as productService from "@/services/adminServices/productService";
import * as categoryService from "@/services/adminServices/categoryService";
import { useNavigate } from "react-router-dom";
import config from "@/config";
import Input from "@/components/Input";


function CreateProduct() {
    const [listCate, setListCate] = useState([]);
    const [stateProduct, setStateProduct] = useState("");
    const navigate = useNavigate()

    console.log('stateProduct',stateProduct)
  // Add Product
  const handleCreateProduct = (e) => {
    e.preventDefault();
    const formData = new FormData()
    const propertiesToAppend = [
      'name', 'price', 'image', 'discount',
      'countInStock', 'description', 'hot','category',
    ];
    propertiesToAppend.forEach(property => {
      if(property === 'image') {
        const images = stateProduct['images']
        for(const image of images) {
            formData.append('images', image)
        }
      }else {
        formData.append(property, stateProduct[property]);
      }
    });

    formData.forEach((value, key) => {
      console.log(key, value);
    });
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

    const handelMoreImages = (e) => {
      console.log(e.target.files)
    }

  // Lấy data từ form
  const handleOnchangeInformation = (e) => {
    const type = e.target.name;
    let value;

    switch (type) {
      case "images":
        value = Array.from(e.target.files);
        break;
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
    <div className="mx-2">
      <form onSubmit={handleCreateProduct} encType="multipart/form-data" className="h-2">
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
            {listCate.map((cate, index) => {
              return (
                <option key={index} value={cate._id}>
                  {cate.name}
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

        <Input type={'file'} name={'images'}  multiple={'multiple'} onChange={handleOnchangeInformation}>Hình Ảnh</Input>

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
          <div className="form-group">
              <p>
                <a className="btn btn-primary col-sm-3" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Thêm ảnh sản phẩm</a>
              </p>
              <div className="row">
                <div className="col">
                  <div className="collapse multi-collapse" id="multiCollapseExample1">
                    <h4 className="card-title">
                    <a className="col-sm-3" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1"></a>
                    </h4>
                    <div className="card card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label htmlFor="exampleSelectGender">image</label>
                            <input onChange={handelMoreImages} type="file" name="file[]" accept="image/*" id="file" multiple className="form-control cpu" itemID="exampleInputName1" />                         
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> 

        <button className="btn btn-primary p-2">Thêm sản phẩm</button>
      </form>
    </div>
  );
}

export default CreateProduct;
