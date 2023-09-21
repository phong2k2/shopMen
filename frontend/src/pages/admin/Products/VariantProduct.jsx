import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as productService from '@/services/adminServices/productService'
// import { formatPrice } from "@/components/formatData/formatData";

function VariantProduct() {
  const {id} = useParams()
  const [stateVariant, setStateVariant] = useState()
  const [proColor, setProColor] = useState()
  const [listSize, setListSize] = useState()
  const [size, setSize] = useState()

  const handleOnchangeInformation = (e) => {
    const type = e.target.name;
    let value;

    switch (type) {
      case "image_color":
        value = Array.from(e.target.files);
        break;
      default:
        value = e.target.value;
        break;
    }
    setStateVariant({
      ...stateVariant,
      [type]: value,
    });
  };


  useEffect(() => {
    const fetchAllColor = async () => {
        try {
            const res = await productService.getAllColor(id)
            setProColor(res)
        }catch (err) {
            console.log(err)
        }      
    }
    fetchAllColor()
  },[])

  useEffect(() => {
    const fetchAllSize = async () => {
        try {
            const res = await productService.getAllSize(id)
            if(res) {
              setListSize(res)
            }
        }catch (err) {
            console.log(err)
        }      
    }
    fetchAllSize()
  },[])

  // Delete Color
  const handleDeleteColor = async (id) => {
    try {
        const res = await productService.deleteColor(id)
        if(res.message) {
            window.location = ''
        }
    }catch (err) {
        console.log(err)
    }
  }

  // Create Color
  const handleSubmitCreateColor = async () => {
    const formData = new FormData()
    const propertiesToAppend = [
      'color', 'image_color','product',
    ];
    propertiesToAppend.forEach(property => {
      if(property === 'image_color') {
        const images = stateVariant[property]
        for(const image of images) {
            formData.append('images', image)
        }
      }else if(property === 'product'){
        formData.append(property, id)
      }else {
        formData.append(property, stateVariant[property]);
      }
    });
    
    try {
        const res = await productService.createColorProduct(formData)
        console.log(res)
    }catch (err) {
        console.log(err)
    }
  }

  //Create Size
  const handleCreateSize = async () => {
    const formData = {
      size,
      product: id
    }
    try {
      
      const res = await productService.createSizeProduct(formData)
      console.log(res)
  }catch (err) {
      console.log(err)
  }
  }

  //Delete size
  const handleClickDelete = async (id) => {
    try {
      const res = await productService.deleteSize(id)
      if(res.message) {
          window.location = ''
      }
  }catch (err) {
      console.log(err)
  }
  }

  

  return (
    <>
      <div className="content-wrapper">
        {/* Product Details */}
        <div className="row">
          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Biến Thể Sản Phẩm</h4>
              </div>
            </div>
          </div>
        </div>

        {/* Color Details */}
        <div className="row">
          <div className="col-6 grid-margin stretch-card">
            <div className="row">
              <div className="col-12 mt-1">
                <div className="card card-body">
                  <h4 className="card-title">Màu Sắc</h4>
                  {/* ... Color details */}
                  {
                    proColor?.map((itemColor) => {
                        return (
                                <div key={itemColor?._id} className="row">
                                  <div className="col-sm-12">
                                      <div className="col-sm-12">
                                        <div className="form-group">
                                            <label form="exampleSelectGender">Màu sắc</label>
                                            <input type="text" value={itemColor?.color} name="color" disabled className="form-control amount" id="exampleInputName1" placeholder=""/>                         
                                        </div>
                                      </div>
                                      <div className="col-sm-12">
                                        <div className="form-group">
                                            <img src={`http://localhost:3000/${itemColor?.image[0]}`}  width="65%" alt="ko cos anh"/>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="col-sm-6">
                                      <button onClick={() => handleDeleteColor(itemColor?._id)} className="badge badge-danger rounded pb-2 pt-2 pl-4 pr-4 d-flex align-items-center" >
                                        <h4 className="mb-0">Xóa</h4>
                                      </button>
                                    </div>
                                    
                                </div>
                        )
                    })
                  }
                    
                </div>
              </div>
            </div>

            {/* Color Form */}
            <div className="col-12  mt-1">
                <form onSubmit={handleSubmitCreateColor} encType="multipart/form-data" id="form-product" className="forms-sample" >
                    <div className="card card-body">
                    <h4 className="card-title">Thêm Màu Sắc</h4>
                    {/* ... Color form fields */}
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label form="exampleSelectGender">Màu sắc</label>
                                    <input type="text" name="color" className="form-control" onChange={handleOnchangeInformation}  placeholder=""/>                         
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label form="exampleSelectGender">Hình ảnh</label>
                                    <input type="file" name="image_color" onChange={handleOnchangeInformation} multiple className="form-control avatar"/>                    
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary mr-2">
                            Thêm mới
                        </button>
                    </div>
                </form>
            </div>
          </div>

          {/* Memory Details */}
          <div className="col-6 grid-margin stretch-card" id="">
            <div className="row h-100">
              <div className="col-md-12 mt-1">
                <div className="card card-body h-100">
                  <h4 className="card-title">Kích thước</h4>
                  {/* ... Memory details */}
                  {listSize?.map((itemSize, index) => {
                    return(
                      <div className="row d-flex align-items-center" key={index}>
                        <div className="col-sm-6">
                            <div className="form-group">
                                <label form="exampleSelectGender">Size</label>
                                <input type="text" value={itemSize?.size} name="color" disabled className="form-control amount" id="exampleInputName1" placeholder=""/>                         
                            </div>
                          </div>
                          <div className="col-sm-6  mt-3">
                            <button onClick={()=> handleClickDelete(itemSize?._id)} className="badge badge-danger rounded pb-2 pt-2 pl-4 pr-4 d-flex align-items-center" >
                              <h4 className="mb-0">Xóa</h4>
                            </button>
                          </div>
                      </div>
                    ) 
                  })}
                </div>
              </div>
            </div>

            {/* Memory Form */}
            <div className="col-md-12 mt-1">
              <form onSubmit={handleCreateSize} id="form-product" className="forms-sample" >
                <input type="hidden" name="id" />
                <div className="card card-body">
                  <h4 className="card-title">Thêm kích thước</h4>
                  <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label form="exampleSelectGender">Size</label>
                            <input type="text" name="size" className="form-control" onChange={(e) => setSize(e.target.value)}  placeholder=""/>                         
                        </div>
                    </div>
                </div>
                  <button  type="submit" className="btn btn-primary mr-2">
                    Thêm mới
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VariantProduct;
