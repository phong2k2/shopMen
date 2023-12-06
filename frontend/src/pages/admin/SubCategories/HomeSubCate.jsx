import { useEffect, useState } from "react";
import * as subCategoryService from "@/services/subCategoryService";
import { useParams } from "react-router-dom";
import {
  Container,
  Button,
  InputLabel,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Grid,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InputField from "@/components/form-controls/InputField";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "react-query";
import EmptyBox from "@/components/EmptyBox";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import { toast } from "react-toastify";

const initValues = {
  category: "",
  name: "",
  image: "",
};

function SubCategory() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  const queryClient = useQueryClient();

  const schema = yup.object().shape({});

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const handleOpenModal = () => {
    setIsAddMode(true);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  //Get SubCategory
  const subCategoryQuery = useQuery({
    queryKey: ["allSubcategory", id],
    queryFn: () => subCategoryService.getSubCategoryByCategory(id),
  });

  // Get SubCategory Detail
  const getSubCateDetails = useMutation({
    mutationFn: (id) => subCategoryService.getDetailSubCategory(id),
  });

  const handleUpdateSupCategory = (id) => {
    setIsAddMode(false);
    getSubCateDetails.mutate(id, {
      onSuccess: () => {
        setOpen(true);
      },
    });
  };
  //ADD
  const addSubCategoryMutation = useMutation({
    mutationFn: (formData) => {
      return subCategoryService.createSubCategory(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allSubcategory", id],
        exact: true,
      });
      setOpen(false);
      setOpenLoading(false);
      toast.success("Thêm danh mục thành công");
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.success(error.message);
      }
      setOpen(false);
      setOpenLoading(false);
    },
  });
  // Update
  const updateSubCategoryMutation = useMutation({
    mutationFn: (requestData) => {
      const { id, newData } = requestData;
      return subCategoryService.updateSubCategory(id, newData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allSubcategory", id],
        exact: true,
      });
      setOpen(false);
      setOpenLoading(false);
      toast.success("Sửa danh mục thành công");
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.success(error.message);
      }
      setOpen(false);
      setOpenLoading(false);
    },
  });

  //DELETE
  const deleteSubCategory = useMutation({
    mutationFn: ({ id, publicId }) =>
      subCategoryService.deleteSubCategory(id, publicId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["allSubcategory", id],
        exact: true,
      });
      setOpen(false);
      setOpenLoading(false);
      toast.success(response.message);
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.success(error.message);
      }
      setOpen(false);
      setOpenLoading(false);
    },
  });

  //Delete SubCategory
  const handleClickDeleteSubCate = async (id, publicId) => {
    deleteSubCategory.mutate({ id, publicId });
    setOpenLoading(true);
  };

  const { data: subCategory } = subCategoryQuery;

  useEffect(() => {
    if (!isAddMode) {
      if (getSubCateDetails?.data) {
        reset(getSubCateDetails?.data);
      }
    }
  }, [getSubCateDetails?.data, reset]);

  // Submit Form
  const handleCreateSubCate = (values) => {
    setOpenLoading(true);
    values.category = id;
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
      addSubCategoryMutation.mutate(formData);
    } else {
      const requestData = {
        newData: formData,
        id: values?._id,
      };
      updateSubCategoryMutation.mutate(requestData, {
        onSuccess: () => {
          setOpen(false);
          queryClient.invalidateQueries({
            queryKey: ["allSubcategory", id],
            exact: true,
          });
        },
      });
    }
  };

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
  };
  return (
    <>
      <LoadingBackdrop openLoading={openLoading} />
      <Container>
        <Typography variant="h5" className="pb-4">
          Quản lý danh mục con
        </Typography>
        <Paper sx={{ width: "100%", padding: "10px" }} elevation={1} square>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button startIcon={<AddIcon />} onClick={handleOpenModal}>
              Thêm
            </Button>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STT</TableCell>
                  <TableCell>Màu sắc sản phẩm</TableCell>
                  <TableCell>Giá thêm</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {subCategory?.map((item, index) => (
                  <TableRow key={item?._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>
                      <img
                        className="img-thumbnail"
                        src={item?.image?.url}
                        alt=""
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        onClick={() => handleUpdateSupCategory(item?._id)}
                      >
                        <Tooltip title="Sửa" placement="top">
                          <BorderColorIcon />
                        </Tooltip>
                      </Button>
                      <Button
                        onClick={() =>
                          handleClickDeleteSubCate(
                            item?._id,
                            item?.image?.publicId
                          )
                        }
                      >
                        <Tooltip title="Xóa" placement="top">
                          <DeleteForeverIcon />
                        </Tooltip>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {subCategory?.length <= 0 && <EmptyBox title="Danh sách trống." />}
          </TableContainer>
        </Paper>
        <Dialog open={open} onClose={handleCloseModal}>
          <DialogTitle variant="h6">
            {isAddMode ? "Thêm loại sản phẩm" : "Sửa loại sản phẩm"}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <form
              onSubmit={handleSubmit(handleCreateSubCate)}
              encType="multipart/form-data"
              style={{ marginTop: 0 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel id="category-label">Tên danh mục</InputLabel>
                  <InputField
                    name={"name"}
                    type="text"
                    validate={register("name")}
                    errors={errors}
                    sx={{ marginTop: "0", paddingTop: 0 }}
                    //   margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id="category-label">Hình ảnh</InputLabel>
                  <InputField
                    name={"image"}
                    validate={register("image")}
                    errors={errors}
                    type="file"
                    onChange={handlePreviewAvatar}
                  />
                </Grid>
                {/* <Grid xs={6}>
                  <img
                    src={
                      avatar?.preview
                        ? avatar?.preview
                        : productDetail?.image?.url
                    }
                    width="30%"
                    alt="ko có anh"
                  />
                </Grid> */}
              </Grid>
              <Button
                sx={{ marginTop: 2 }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Hoàn thành
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}

export default SubCategory;
