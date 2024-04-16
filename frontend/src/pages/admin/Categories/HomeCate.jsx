import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InputField from "@/components/form-controls/InputField";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import EmptyBox from "@/components/EmptyBox";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getDetailCategory,
  updateCategory,
} from "@/services/categoryService";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import { toast } from "react-toastify";

const initCategory = {
  name: "",
};

function HomeCate() {
  const [openLoading, setOpenLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  const [idEdit, setIdEdit] = useState();
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

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenModal = () => {
    setIsAddMode(true);
    setOpen(true);
  };

  const handleUpdateCategory = (idEdit) => {
    setIdEdit(idEdit);
    setIsAddMode(false);
    setOpen(true);
  };

  const getAllCategoryQuery = useQuery({
    queryKey: "allCategory",
    queryFn: () => getAllCategory(),
  });

  const getCategoryDetailQuery = useQuery({
    queryKey: ["categoryDetail", idEdit],
    queryFn: () => getDetailCategory(idEdit),
    enabled: idEdit !== undefined,
  });

  const addCategoryMutation = useMutation({
    mutationFn: (values) => createCategory(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allCategory"],
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

  const updateCategoryMutation = useMutation({
    mutationFn: (dataUpdate) => updateCategory(dataUpdate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allCategory"],
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

  const deleteCategoryMutation = useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["allCategory"],
        exact: true,
      });
      setOpen(false);
      setOpenLoading(false);
      toast.success(response.message);
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.error(error.message);
      }
      setOpen(false);
      setOpenLoading(false);
    },
  });

  const { data: listCate } = getAllCategoryQuery;
  const { data: categoryDetail } = getCategoryDetailQuery;

  useEffect(() => {
    if (isAddMode) {
      reset(initCategory);
    } else {
      if (categoryDetail) {
        reset(categoryDetail);
      }
    }
  }, [categoryDetail, isAddMode, reset]);

  // Handle Category
  const handleCategory = (values) => {
    setOpenLoading(true);
    if (isAddMode) {
      addCategoryMutation.mutate(values);
    } else {
      const { _id, ...newData } = values;
      const dataUpdate = {
        newData,
        id: _id,
      };
      updateCategoryMutation.mutate(dataUpdate);
    }
  };

  const handleDeleteCategory = (id) => {
    setOpenLoading(true);
    deleteCategoryMutation.mutate(id);
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
                  <TableCell sx={{ textAlign: 'center' }}>STT</TableCell>
                  <TableCell  sx={{ textAlign: 'center' }}>Tên Danh mục</TableCell>
                  <TableCell  sx={{ textAlign: 'center' }}>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listCate?.map((item, index) => (
                  <TableRow key={item?._id}>
                    <TableCell  sx={{ textAlign: 'center' }}>{++index}</TableCell>
                    <TableCell  sx={{ textAlign: 'center' }}>
                      <Link to={`/admin/cate-item/${item?._id}`}>
                        {item?.name}
                      </Link>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <NavLink
                        style={{
                          marginRight: '15px'
                        }}
                        to={`/admin/cate-item/${item?._id}`}
                      >
                        <Tooltip title="Xem chi tiết" placement="top">
                          <RemoveRedEyeIcon 
                            sx={{
                              fontSize: 18
                            }}
                          />
                        </Tooltip>
                      </NavLink>
                      <NavLink 
                        style={{
                          marginRight: '15px'
                        }}
                       onClick={() => handleUpdateCategory(item?._id)}>
                        <Tooltip title="Sửa" placement="top">
                          <BorderColorIcon />
                        </Tooltip>
                      </NavLink>
                      <NavLink
                        style={{
                          marginRight: '15px'
                        }}
                        onClick={() =>
                          handleDeleteCategory(item?._id, item?.image?.publicId)
                        }
                      >
                        <Tooltip title="Xóa" placement="top">
                          <DeleteForeverIcon />
                        </Tooltip>
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {listCate?.length <= 0 && <EmptyBox title="Danh sách trống." />}
          </TableContainer>
        </Paper>
        <Dialog  open={open} onClose={handleCloseModal}>
          <DialogTitle variant="h6">
            {isAddMode ? "Thêm danh mục" : "Sửa danh mục"}
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
          <DialogContent sx={{ paddingTop: 0, width: 600 }}>
            <Box 
              component="form"
              onSubmit={handleSubmit(handleCategory)}
              encType="multipart/form-data"
              style={{ marginTop: 0 }}
            >
              <Grid container>
                <Grid item xs={12}>
                  <InputLabel id="category-label">Tên danh mục</InputLabel>
                  <InputField
                    name={"name"}
                    type="text"
                    validate={register("name")}
                    errors={errors}
                    sx={{ marginTop: "0", paddingTop: 0 }}
                  />
                </Grid>
                <Button
                  sx={{ marginTop: 1, fontSize: 12 }}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Hoàn thành
                </Button>
              </Grid>
            </Box>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}

export default HomeCate;
