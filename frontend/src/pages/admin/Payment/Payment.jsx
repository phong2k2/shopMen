import {
  Container,
  Button,
  FormControl,
  InputLabel,
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
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import InputField from "@/components/form-controls/InputField";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createPayment,
  getAllPayments,
  getPaymentDetail,
  updatePayment,
  deletePayment,
  updatePaymentStatus,
} from "@/services/paymentService";
import EmptyBox from "@/components/EmptyBox";
import { toast } from "react-toastify";
import LoadingBackdrop from "@/components/LoadingBackdrop";

const initPayment = {
  name: "",
  description: "",
  status: "",
};

function Payment() {
  const [open, setOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);
  const queryClient = useQueryClient();
  const [openLoading, setOpenLoading] = useState(false);

  const schema = yup.object().shape({});

  const {
    register,
    formState: { errors },
    reset,
    control,
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

  //get all payments
  const getAllPaymentsQuery = useQuery({
    queryKey: "getAllPayments",
    queryFn: () => getAllPayments(),
  });

  const getDetailPaymentMutation = useMutation({
    mutationFn: (id) => getPaymentDetail(id),
  });

  const createPaymentMutation = useMutation({
    mutationFn: (data) => createPayment(data),
    onSuccess: () => {
      setOpen(false);
      setIsAddMode(false);
      queryClient.invalidateQueries({
        queryKey: "getAllPayments",
        exact: true,
      });
      toast.success("Thêm phương thức thanh toán thành công");
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.success(error.message);
      }
      setOpenLoading(false);
    },
  });

  const updatePaymentMutation = useMutation({
    mutationFn: (data) => {
      const id = data._id;
      return updatePayment(id, data);
    },
    onSuccess: () => {
      setOpen(false);
      setOpenLoading(false);
      queryClient.invalidateQueries({
        queryKey: "getAllPayments",
        exact: true,
      });
      toast.success("Sửa phương thức thanh toán thành công");
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.success(error.message);
      }
      setOpenLoading(false);
      setOpen(false);
    },
  });

  const deletePaymentMutation = useMutation({
    mutationFn: (id) => deletePayment(id),
    onSuccess: (response) => {
      setOpenLoading(false);
      queryClient.invalidateQueries({
        queryKey: "getAllPayments",
        exact: true,
      });
      toast.success(response?.message);
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.success(error.message);
      }
      setOpenLoading(false);
      setOpen(false);
    },
  });

  const { data: allPayments } = getAllPaymentsQuery;
  const { data: paymentDetails } = getDetailPaymentMutation;

  // Update payment
  const handleUpdatePayment = (id) => {
    setOpen(true);
    setIsAddMode(false);
    getDetailPaymentMutation.mutate(id);
  };

  // Delete Payment
  const handleDeletePayment = (id) => {
    deletePaymentMutation.mutate(id);
  };

  // Update payment status
  const updatePaymentStatusMutation = useMutation({
    mutationFn: ({ id, newStatus }) => updatePaymentStatus(id, newStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: "getAllPayments",
        exact: true,
      });
      setOpenLoading(false);
      toast.success("Thay đổi trạng thái thành công");
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.success(error.message);
      }
      setOpenLoading(false);
    },
  });

  const handleClickChangeStatus = (id, status) => {
    if (!status) return;
    const newStatus = status === "active" ? "inactive" : "active";
    setOpenLoading(true);
    updatePaymentStatusMutation.mutate({ id, newStatus });
  };

  useEffect(() => {
    if (isAddMode) {
      reset(initPayment);
    } else {
      if (paymentDetails) {
        reset(paymentDetails);
      }
    }
  }, [isAddMode, paymentDetails]);

  const handleOnSubmitPayment = (values) => {
    setOpenLoading(true);
    if (isAddMode) {
      createPaymentMutation.mutate(values);
    } else {
      updatePaymentMutation.mutate(values);
    }
  };

  return (
    <>
      <LoadingBackdrop openLoading={openLoading} />
      <Container>
        <Typography variant="h5" className="pb-4">
          Quản lý phương thức thanh toán
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
                  <TableCell>Phương thức thanh toán</TableCell>
                  <TableCell>Mô tả</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>Thao tác</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allPayments?.map((itemPayment, index) => (
                  <TableRow key={itemPayment?._id}>
                    <TableCell>{++index}</TableCell>
                    <TableCell>{itemPayment?.name}</TableCell>
                    <TableCell>{itemPayment?.description}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() =>
                          handleClickChangeStatus(
                            itemPayment?._id,
                            itemPayment?.status
                          )
                        }
                        variant="contained"
                        color={
                          itemPayment?.status === "active" ? "success" : "error"
                        }
                      >
                        {itemPayment?.status}
                      </Button>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        onClick={() => handleUpdatePayment(itemPayment?._id)}
                      >
                        <Tooltip title="Sửa" placement="top">
                          <BorderColorIcon />
                        </Tooltip>
                      </Button>
                      <Button
                        onClick={() => handleDeletePayment(itemPayment?._id)}
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
            {allPayments?.length <= 0 && (
              <EmptyBox title="Không có phước thức thánh toán." />
            )}
          </TableContainer>
        </Paper>
        <Dialog open={open} onClose={handleCloseModal}>
          <DialogTitle variant="h6">
            {isAddMode
              ? "Thêm phương thức thanh toán"
              : "Sửa phương thức thanh toán"}
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
              onSubmit={handleSubmit(handleOnSubmitPayment)}
              encType="multipart/form-data"
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputLabel>Tên phương thức thanh toán</InputLabel>
                  <InputField
                    name={"name"}
                    validate={register("name")}
                    errors={errors}
                    sx={{ marginTop: "0", paddingTop: 0 }}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Mô tả</InputLabel>
                  <InputField
                    name={"description"}
                    validate={register("description")}
                    errors={errors}
                    sx={{ marginTop: "0", paddingTop: 0 }}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth error={!!errors.name}>
                    <InputLabel>Trạng thái</InputLabel>
                    <Controller
                      render={({ field }) => (
                        <Select {...field} value={field?.value || ""}>
                          <MenuItem value="">Chọn trạng thái</MenuItem>
                          <MenuItem value="active">Hiển thị</MenuItem>
                          <MenuItem value="inactive">Ẩn</MenuItem>
                        </Select>
                      )}
                      name={"status"}
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
                  <Button variant="contained" color="primary" type="submit">
                    Hoàn thành
                  </Button>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
}

export default Payment;
