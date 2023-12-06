import { useEffect, useState } from "react";
import {
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
  Container,
} from "@mui/material";
import PropTypes from "prop-types";
import AddIcon from "@mui/icons-material/Add";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CloseIcon from "@mui/icons-material/Close";
import InputField from "@/components/form-controls/InputField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EmptyBox from "@/components/EmptyBox";

function ImageModal({
  onSubmitAddImage,
  getAllImages,
  handleOpenModal,
  handleCloseModal,
  handleUpdateImage,
  handleDeleteImage,
  getProductDetailsColor,
  open,
  isAddMode,
}) {
  const [avatar, setAvatar] = useState();
  const { data: allImage } = getAllImages;
  const [imageDetail, setImageDetail] = useState();

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

  useEffect(() => {
    if (isAddMode) {
      // reset(initValues);
    } else {
      if (getProductDetailsColor?.data) {
        setImageDetail(getProductDetailsColor?.data);
        reset(getProductDetailsColor?.data);
      }
    }
  }, [getProductDetailsColor?.data, reset]);

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
    <div>
      <Paper sx={{ width: "100%", padding: "10px" }} elevation={1} square>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">Danh sách hình ảnh</Typography>
          <Button startIcon={<AddIcon />} onClick={handleOpenModal}>
            Thêm
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên hình ảnh</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Thao tác</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allImage?.map((itemColor, index) => (
                <TableRow key={itemColor?._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{itemColor?.nameImage}</TableCell>
                  <TableCell>
                    <img
                      src={itemColor?.image?.url}
                      alt={itemColor?.nameImage}
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button onClick={() => handleUpdateImage(itemColor?._id)}>
                      <Tooltip title="Sửa" placement="top">
                        <BorderColorIcon />
                      </Tooltip>
                    </Button>
                    <Button
                      onClick={() =>
                        handleDeleteImage(
                          itemColor?._id,
                          itemColor?.image?.publicId
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
          {allImage?.length <= 0 && (
            <EmptyBox title="Không có hình ảnh sản phẩm." />
          )}
        </TableContainer>
      </Paper>
      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle variant="h6">
          {isAddMode ? "Thêm" : "Sửa"} hình ảnh chi tiết sản phẩm
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
            onSubmit={handleSubmit(onSubmitAddImage)}
            encType="multipart/form-data"
            sx={{
              marginTop: 0,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InputLabel id="category-label">Tên hình ảnh</InputLabel>
                <InputField
                  name="nameImage"
                  validate={register("nameImage")}
                  errors={errors}
                  sx={{ marginTop: "0", paddingTop: 0 }}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="category-label">Ảnh hiển thị</InputLabel>
                <img
                  src={
                    avatar?.preview ? avatar?.preview : imageDetail?.image?.url
                  }
                  width="30%"
                  alt="ko có anh"
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="category-label">Hình ảnh</InputLabel>
                <InputField
                  onChange={handlePreviewAvatar}
                  name="image"
                  validate={register("image")}
                  type="file"
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

ImageModal.propTypes = {
  onSubmitAddImage: PropTypes.func,
  getAllImages: PropTypes.object,
  handleOpenModal: PropTypes.func,
  handleCloseModal: PropTypes.func,
  handleUpdateImage: PropTypes.func,
  handleDeleteImage: PropTypes.func,
  getProductDetailsColor: PropTypes.object,
  open: PropTypes.bool,
  isAddMode: PropTypes.bool,
};

export default ImageModal;
