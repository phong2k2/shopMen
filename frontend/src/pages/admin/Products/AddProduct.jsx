import { useState, useEffect } from "react";
import * as productService from "@/services/productService";
import * as categoryService from "@/services/categoryService";
import * as subCategoryService from "@/services/subCategoryService";
import { useMatch, useNavigate, useParams } from "react-router-dom";
import config from "@/config";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  NativeSelect,
  Grid,
} from "@mui/material";
import HeaderPageAdmin from "@/components/HeaderPageAdmin";
import InputField from "@/components/form-controls/InputField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "@/components/TextArea";
import { useMutation, useQuery } from "react-query";
import { schemaHandleProduct } from "@/validations/adminValidations";
import { toast } from "react-toastify";
import LoadingBackdrop from "@/components/LoadingBackdrop";

const initValues = {
  name: "",
  category: "",
  subCategory: "",
  hot: "",
  price: "",
  countInStock: "",
  salePrice: "",
  description: "",
};
const statusProduct = [
  {
    id: 1,
    status: "hot",
    name: "Hot",
  },
  {
    id: 2,
    status: "normal",
    name: "Bình thường",
  },
];

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState();
  const [categoryId, setCategoryId] = useState();
  const addMatch = useMatch("/admin/product/create");
  const isAddMode = Boolean(addMatch);
  const [openLoading, setOpenLoading] = useState(false);

  const {
    register,
    formState: { errors },
    reset,
    control,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaHandleProduct),
    defaultValues: productDetail,
  });

  // [Get] Product Details
  const { data: getProductDetails } = useQuery({
    queryKey: ["productDetail", id],
    queryFn: () => productService.getProductDetailByAdmin(id),
    enabled: id !== undefined,
    staleTime: 10000 * 60,
  });

  // [Get] Sub Category
  const { data: getSubCategory } = useQuery({
    queryKey: ["subCategoryByCategory", categoryId],
    queryFn: () => subCategoryService.getSubCategoryByCategory(categoryId),
    enabled: categoryId !== undefined,
  });

  useEffect(() => {
    if (isAddMode) {
      reset(initValues);
      setProductDetail("");
    } else {
      if (getProductDetails) {
        reset(getProductDetails);
        setProductDetail(getProductDetails);
        setCategoryId(getProductDetails.category);
      }
    }
  }, [getProductDetails, reset, isAddMode]);

  // Get All Category
  const { data: listCategory } = useQuery({
    queryKey: ["category"],
    queryFn: () => categoryService.getAllCategory(),
  });

  // Mutations Add Product
  const addProductMutation = useMutation({
    mutationFn: (formData) => productService.createProduct(formData),
    onSuccess: () => {
      setOpenLoading(false);
      navigate(config.PRIVATEROUTER.indexProduct);
      toast.success("Thêm sản phẩm thành công");
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        setOpenLoading(false);
        toast.error(error.message);
      }
    },
  });

  // Mutations Update Product
  const updateProductMutation = useMutation({
    mutationFn: (values) => productService.updateProduct(values, id),
    onSuccess: () => {
      navigate(config.PRIVATEROUTER.indexProduct);
      setOpenLoading(false);
      toast.success("Sửa sản phẩm thành công");
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.error(error.message);
      }
    },
  });

  const handleOnSubmitAddProduct = (values) => {
    setOpenLoading(true);
    if (!values) return;
    values.salePrice = values.price - values.salePrice;
    if (isAddMode) {
      addProductMutation.mutate(values);
    } else {
      updateProductMutation.mutate(values);
    }
  };

  return (
    <>
      <LoadingBackdrop openLoading={openLoading} />
      <Container fixed>
        <HeaderPageAdmin
          title={isAddMode ? "Thêm sản phẩm" : "Sửa sản phẩm"}
          subTitle={"Nhập thông tin"}
        />
        <form
          onSubmit={handleSubmit(handleOnSubmitAddProduct)}
          encType="multipart/form-data"
          className="h-100 mt-5"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <InputLabel id="category-label">Tên sản phẩm</InputLabel>
              <InputField
                name={"name"}
                validate={register("name")}
                errors={errors}
              />
            </Grid>

            <Grid item xs={4}>
              <InputLabel id="category-label">Danh mục</InputLabel>
              <FormControl fullWidth error={!!errors.category}>
                <Controller
                  render={({ field }) => (
                    <Select {...field} value={field.value || ""}>
                      {listCategory?.map((item) => (
                        <MenuItem
                          onClick={() => setCategoryId(item._id)}
                          value={item._id}
                          key={item._id}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  name={`category`}
                  control={control}
                  variant="filled"
                />
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <InputLabel id="category-label">Loại sản phẩm</InputLabel>
              <FormControl fullWidth error={!!errors.subCategory}>
                <Controller
                  render={({ field }) => (
                    <Select {...field} value={field?.value || ""}>
                      {getSubCategory?.length > 0 ? (
                        getSubCategory?.map((item) => (
                          <MenuItem value={item._id} key={item._id}>
                            {item.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem>-</MenuItem>
                      )}
                    </Select>
                  )}
                  name={"subCategory"}
                  control={control}
                  variant="filled"
                />
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <InputLabel>Trạng thái</InputLabel>
              <FormControl fullWidth error={!!errors.hot}>
                <Controller
                  render={({ field }) => (
                    <Select {...field} value={field?.value || ""}>
                      {statusProduct?.map((item) => (
                        <MenuItem key={item.id} value={item.status}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  name={"hot"}
                  control={control}
                  variant="filled"
                />
                {/* <FormHelperText>{errors.hot?.message}</FormHelperText> */}
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <InputLabel id="category-label">Giá sản phẩm</InputLabel>
              <InputField
                name={"price"}
                validate={register("price")}
                errors={errors}
                type="number"
              />
            </Grid>

            <Grid item xs={4}>
              <InputLabel id="category-label">Số lượng</InputLabel>
              <InputField
                name={"countInStock"}
                validate={register("countInStock")}
                errors={errors}
              />
            </Grid>

            <Grid item xs={4}>
              <InputLabel id="category-label">Giảm giá</InputLabel>
              <InputField
                name={"salePrice"}
                validate={register("salePrice")}
                errors={errors}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="description-label">Mô tả sản phẩm</InputLabel>
              <FormControl fullWidth error={!!errors.description}>
                <Controller
                  render={({ field }) => (
                    <TextArea field={field} error={!!errors.description} />
                  )}
                  name={"description"}
                  control={control}
                />
                <FormHelperText>{errors?.description?.message}</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Button sx={{ mt: 2 }} type="submit" variant="contained" size="large">
            Hoàn thành
          </Button>
        </form>
      </Container>
    </>
  );
}

export default EditProduct;
