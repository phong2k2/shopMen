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
  Grid,
} from "@mui/material";
import HeaderPageAdmin from "@/components/HeaderPageAdmin";
import InputField from "@/components/form-controls/InputField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextArea from "@/components/TextArea";
import { useMutation, useQuery } from "react-query";
import { schemaHandleProduct } from "@/Validations/adminValidations";
import { toast } from "react-toastify";
import LoadingBackdrop from "@/components/LoadingBackdrop";

const initValues = {
  name: "",
  category: "",
  subCategory: "",
  hot: "",
  price: "",
  countInStock: "",
  discount: "",
  image: "",
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
  const { slug } = useParams();
  const navigate = useNavigate();
  const [productDetail, setProductDetail] = useState();
  const addMatch = useMatch("/admin/product/create");
  const isAddMode = Boolean(addMatch);
  const [avatar, setAvatar] = useState();
  const [openLoading, setOpenLoading] = useState(false);

  const {
    register,
    formState: { errors },
    reset,
    watch,
    control,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaHandleProduct),
    defaultValues: productDetail,
  });

  const id = watch("category");

  // [Get] Product Details
  const getProductDetails = useQuery({
    queryKey: ["productDetail", slug],
    queryFn: () => productService.getProductDetail(slug),
    enabled: slug !== undefined,
    staleTime: 10000 * 60,
  });

  useEffect(() => {
    if (isAddMode) {
      reset(initValues);
      setProductDetail("");
    } else {
      if (getProductDetails?.data) {
        reset(getProductDetails?.data);
        setProductDetail(getProductDetails?.data);
      }
    }
  }, [getProductDetails?.data, reset, isAddMode]);

  // Get All Category
  const categoryQuery = useQuery({
    queryKey: ["category"],
    queryFn: () => categoryService.getAllCategory(),
  });

  // Get Sub Category
  const subCategoryQuery = useQuery({
    queryKey: ["subCategory", id],
    queryFn: () => subCategoryService.getSubCategoryByCategory(id),
    enabled: id !== undefined && !!id,
    staleTime: 10000 * 60,
  });

  const { data: category } = categoryQuery;
  const { data: subCategory } = subCategoryQuery;
  console.log(category);
  // Mutations Add Product
  const addProductMutation = useMutation({
    mutationFn: (formData) => productService.createProduct(formData),
    onSuccess: () => {
      setAvatar("");
      setOpenLoading(false);
      navigate(config.privateRouter.indexProduct);
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
    mutationFn: (formData) => productService.updateProduct(formData, slug),
    onSuccess: () => {
      navigate(config.privateRouter.indexProduct);
      setAvatar("");
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
    const formData = new FormData();
    for (let name in initValues) {
      if (name === "image") {
        if (!values[name][0]) {
          continue;
        } else {
          formData.append(name, values[name][0]);
        }
      } else {
        formData.append(name, values[name]);
      }
    }

    if (isAddMode) {
      addProductMutation.mutate(formData);
    } else {
      updateProductMutation.mutate(formData);
    }
  };

  // Show avatar at the img
  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setAvatar(file);
  };
  // Delete old photos when changing photos
  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar.preview);
    };
  }, [avatar]);

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
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel id="category-label">Danh mục</InputLabel>
                <Controller
                  render={({ field }) => (
                    <Select
                      labelId={`labelId`}
                      {...field}
                      value={field.value || ""}
                    >
                      {category?.map((item) => (
                        <MenuItem value={item._id} key={item._id}>
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
              <FormControl fullWidth error={!!errors.subCategory}>
                <InputLabel id="category-label">Loại sản phẩm</InputLabel>
                <Controller
                  render={({ field }) => (
                    <Select
                      labelId={`labelId`}
                      {...field}
                      value={field?.value || ""}
                    >
                      {subCategory?.length > 0 ? (
                        subCategory?.map((item) => (
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
              <FormControl fullWidth error={!!errors.hot}>
                <InputLabel>Trạng thái</InputLabel>
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
                name={"discount"}
                validate={register("discount")}
                errors={errors}
              />
            </Grid>

            <Grid item xs={6}>
              <InputLabel id="category-label">Hình ảnh</InputLabel>
              <InputField
                name={"image"}
                validate={register("image")}
                errors={errors}
                type="file"
                onChange={handlePreviewAvatar}
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={
                  avatar?.preview ? avatar?.preview : productDetail?.image?.url
                }
                width="30%"
                alt="ko có anh"
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
