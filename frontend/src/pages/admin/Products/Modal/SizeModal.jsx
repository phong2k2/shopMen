import {
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
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
  Container,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller } from "react-hook-form";
import InputField from "@/components/form-controls/InputField";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EmptyBox from "@/components/EmptyBox";

const stateSizes = [
  {
    id: 0,
    name: "S",
  },
  {
    id: 1,
    name: "M",
  },
  {
    id: 2,
    name: "L",
  },
  {
    id: 3,
    name: "2XL",
  },
];

const initSize = {
  height: '',
  mass: '',
  productColor: '',
  size: '',
  width: '',
}

function SizeModal({
  handleOpenModal,
  handleCloseModal,
  onSubmitAddSize,
  handleUpdateSize,
  handleDeleteSize,
  getSizeDetail,
  isAddMode,
  getAllSizes,
  open,
}) {
  const { data: allSizes } = getAllSizes;
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

  useEffect(() => {
    console.log("🚀 ~ isAddMode:", isAddMode)
    if (isAddMode) {
      reset(initSize);
    } else {
      if (getSizeDetail?.data) {
        reset(getSizeDetail?.data);
      }
    }
  }, [getSizeDetail?.data, isAddMode, reset]);

  return (
    <div>
      <Paper
        sx={{ width: "100%", padding: "10px", marginTop: "20px" }}
        elevation={1}
        square
      >
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">Danh sách kích thước chi tiết</Typography>
          <Button startIcon={<AddIcon />} onClick={handleOpenModal}>
            Thêm
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Kích thước</TableCell>
                <TableCell>Chiều rộng</TableCell>
                <TableCell>Chiều dài</TableCell>
                <TableCell>Khối lượng</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allSizes?.map((itemColor, index) => (
                <TableRow key={itemColor?._id}>
                  <TableCell>{++index}</TableCell>
                  <TableCell>{itemColor?.size}</TableCell>
                  <TableCell>{itemColor?.width}</TableCell>
                  <TableCell>{itemColor?.height}</TableCell>
                  <TableCell>{itemColor?.mass}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button onClick={() => handleUpdateSize(itemColor?._id)}>
                      <Tooltip title="Sửa" placement="top">
                        <BorderColorIcon />
                      </Tooltip>
                    </Button>
                    <Button onClick={() => handleDeleteSize(itemColor?._id)}>
                      <Tooltip title="Xóa" placement="top">
                        <DeleteForeverIcon />
                      </Tooltip>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {allSizes?.length <= 0 && (
            <EmptyBox title="Không có thông số kích thước." />
          )}
        </TableContainer>
      </Paper>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle variant="h6">
          {isAddMode ? "Thêm" : "Sửa"} kích thước sản phẩm
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
            sx={{
              marginTop: 0,
            }}
            onSubmit={handleSubmit(onSubmitAddSize)}
            encType="multipart/form-data"
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel id="category-label">Size sản phẩm</InputLabel>
                <FormControl fullWidth error={!!errors.name}>
                  <Controller
                    render={({ field }) => (
                      <Select {...field} value={field?.value || ""}>
                        {stateSizes.map((itemColor) => (
                          <MenuItem key={itemColor.id} value={itemColor.name}>
                            {itemColor.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    name={"size"}
                    control={control}
                    variant="filled"
                  />
                </FormControl>
                <ErrorMessage
                  errors={errors}
                  name="size"
                  render={({ message }) => (
                    <p style={{ color: "red", marginLeft: "10px" }}>
                      {message}
                    </p>
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="category-label">Chiều rộng</InputLabel>
                <InputField
                  name="width"
                  type="number"
                  validate={register("width")}
                  errors={errors}
                  sx={{ marginTop: "0", paddingTop: 0 }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="category-label">Chiều cao</InputLabel>
                <InputField
                  name="height"
                  type="number"
                  validate={register("height")}
                  errors={errors}
                  sx={{ marginTop: "0", paddingTop: 0 }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="category-label">Khối lượng</InputLabel>
                <InputField
                  name="mass"
                  validate={register("mass")}
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
    </div>
  );
}

SizeModal.propTypes = {
  onSubmitAddSize: PropTypes.func,
  handleOpenModal: PropTypes.func,
  handleCloseModal: PropTypes.func,
  handleUpdateSize: PropTypes.func,
  getSizeDetail: PropTypes.object,
  handleDeleteSize: PropTypes.func,
  isAddMode: PropTypes.bool,
  getAllSizes: PropTypes.object,
  open: PropTypes.bool,
  form: PropTypes.object,
};

export default SizeModal;
