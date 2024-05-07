import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import * as productColorService from "@/services/colorService";
import {
  Container,
  Button,
  FormControl,
  Select,
  MenuItem,
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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "@/components/form-controls/InputField";
import CloseIcon from "@mui/icons-material/Close";
import { ErrorMessage } from "@hookform/error-message";
import { useMutation, useQuery, useQueryClient } from "react-query";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { formatPrice } from "@/components/formatData/formatData";
import EmptyBox from "@/components/EmptyBox";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import { toast } from "react-toastify";
import { schemaColor } from "@/validations/adminValidations";

const stateColor = [
  {
    id: 0,
    name: "Đen",
  },
  {
    id: 1,
    name: "Trắng",
  },
  {
    id: 2,
    name: "Đỏ",
  },
  {
    id: 3,
    name: "Xanh",
  },
];

const initColor = {
  nameColor: "",
  price: "",
};

function VariantProduct() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  const [openLoading, setOpenLoading] = useState(false);
  const [idColor, setIdColor] = useState();
  const queryClient = useQueryClient();

  const {
    register,
    formState: { errors },
    reset,
    control,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemaColor),
  });

  const handleOpenModal = () => {
    setIsAddMode(true);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  // Get All Color
  const getAllProductColor = useQuery({
    queryKey: ["colors", id],
    queryFn: () => productColorService.getAllColor(id),
    enabled: id !== undefined,
  });

  // Get Color Details
  const getColorDetailUpdate = useQuery({
    queryKey: ["colorDetail", idColor, open],
    queryFn: () => productColorService.getColorDetail(idColor),
    enabled: idColor !== undefined,
  });

  const { data: allColor } = getAllProductColor;

  useEffect(() => {
    if (isAddMode) {
      reset(initColor);
    } else {
      if (getColorDetailUpdate?.data) {
        reset(getColorDetailUpdate?.data);
      }
    }
  }, [getColorDetailUpdate?.data, isAddMode, reset]);

  // Mutation Add Color
  const createColor = useMutation({
    mutationFn: (data) => productColorService.createColorProduct(data),
    onSuccess: () => {
      setOpenLoading(false);
      queryClient.invalidateQueries({
        queryKey: ["colors", id],
        exact: true,
      });
      setOpen(false);
      reset(initColor);
      toast.success("Thêm màu sản phẩm thành công");
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.error(error.message);
      }
      setOpenLoading(false);
      setOpen(false);
    },
  });

  // Mutation Update Color
  const updateColor = useMutation({
    mutationFn: (data) => {
      const [id, newData] = data;
      return productColorService.updateColorProduct({ id, newData });
    },
    onSuccess: () => {
      setOpenLoading(false);
      reset(initColor);
      queryClient.invalidateQueries({
        queryKey: ["colors", id],
        exact: true,
      });
      setOpen(false);
      toast.success("Sửa màu sản phẩm thành công");
    },
    onError: (error) => {
      console.log(error);
      if (error?.statusCode !== 500) {
        toast.error(error.message);
      }
      setOpenLoading(false);
      setOpen(false);
    },
  });

  // Mutation Delete
  const deleteColor = useMutation({
    mutationFn: (id) => productColorService.deleteColor(id),
    onSuccess: (response) => {
      setOpenLoading(false);
      queryClient.invalidateQueries({
        queryKey: ["colors", id],
        exact: true,
      });
      toast.success(response.message);
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.success(error.message);
      }
      setOpenLoading(false);
    },
  });

  const handleUpdateProductColor = (id) => {
    setIsAddMode(false);
    setOpen(true);
    setIdColor(id);
  };

  const handleDeleteProductColor = (id) => {
    setOpenLoading(true);
    deleteColor.mutate(id);
  };

  const handleOnSubmitAddColor = (values) => {
    setOpenLoading(true);
    if (isAddMode) {
      values.product = id;
      createColor.mutate(values);
    } else {
      const { _id, ...newData } = values;
      updateColor.mutate([_id, newData]);
    }
  };

  return (
    <>
      <LoadingBackdrop openLoading={openLoading} />
      <Container>
        <Typography variant="h5" className="pb-4">
          Quản lý chi tiết sản phẩm
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
                {allColor?.map((itemColor, index) => (
                  <TableRow key={itemColor?._id}>
                    <TableCell>{++index}</TableCell>
                    <TableCell>{itemColor?.nameColor}</TableCell>
                    <TableCell>{formatPrice(itemColor?.price)}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Link to={`/admin/variant-details/${itemColor?._id}`}>
                        <Tooltip title="Xem chi tiết" placement="top">
                          <RemoveRedEyeIcon />
                        </Tooltip>
                      </Link>
                      <Button
                        onClick={() => handleUpdateProductColor(itemColor?._id)}
                      >
                        <Tooltip title="Sửa" placement="top">
                          <BorderColorIcon />
                        </Tooltip>
                      </Button>
                      <Button
                        onClick={() => handleDeleteProductColor(itemColor?._id)}
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
            {allColor?.length <= 0 && (
              <EmptyBox title="Chi tiết sản phẩm trống." />
            )}
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
            <Container
              component="form"
              onSubmit={handleSubmit(handleOnSubmitAddColor)}
              encType="multipart/form-data"
              sx={{
                marginTop: 0,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.name}>
                    <Typography variant="h6">Màu sản phẩm</Typography>
                    <Controller
                      render={({ field }) => (
                        <Select {...field} value={field?.value || ""}>
                          {stateColor.map((itemColor) => (
                            <MenuItem key={itemColor.id} value={itemColor.name}>
                              {itemColor.name}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                      name={"nameColor"}
                      control={control}
                      variant="filled"
                    />
                  </FormControl>
                  <ErrorMessage
                    errors={errors}
                    name="name"
                    render={({ message }) => (
                      <p style={{ color: "red", marginLeft: "10px" }}>
                        {message}
                      </p>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Giá thêm</Typography>
                  <InputField
                    name={"price"}
                    type="number"
                    validate={register("price")}
                    errors={errors}
                    sx={{ marginTop: "0", paddingTop: 0 }}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" type="submit">
                    Hoàn thành
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}

export default VariantProduct;
