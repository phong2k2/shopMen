import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import * as productColorService from "@/services/colorService";
import * as productSizeService from "@/services/sizeSercvice";
import { useMutationHooks } from "@/hook/useMutationHook";
import ImageModal from "./Modal/ImageModal";
import { useQuery, useQueryClient } from "react-query";
import SizeModal from "./Modal/SizeModal";

function VariantProduct() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const [isAddMode, setIsAddMode] = useState(true);

  const handleOpenModal = () => {
    setIsAddMode(true);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenSizeModal = () => {
    setOpenSize(true);
    setIsAddMode(true);
  };

  const handleCloseSizeModal = () => {
    setOpenSize(false);
  };

  const addImageProduct = useMutationHooks((data) => {
    const res = productColorService.createImageProduct(data);
    return res;
  });

  const getAllImages = useQuery({
    queryKey: ["images", id],
    queryFn: () => productColorService.getAllImageProduct(id),
  });

  const getProductDetailsColor = useMutationHooks((id) => {
    const res = productColorService.getImageDetails(id);
    return res;
  });

  const updateImageProduct = useMutationHooks((data) => {
    const { id, newData } = data;
    const res = productColorService.updateImageProduct({ id, newData });
    return res;
  });

  const handleUpdateImage = (id) => {
    setOpen(true);
    setIsAddMode(false);
    getProductDetailsColor.mutate(id);
  };

  const handleDeleteImage = (id, publicId) => {
    deleteImage.mutate({ id, publicId });
  };

  //Delete
  const deleteImage = useMutationHooks(
    (data) => {
      const { id, publicId } = data;
      const res = productColorService.deleteImageProduct(id, publicId);
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["images", id],
          exact: true,
        });
      },
    }
  );

  const handleOnSubmitAddImage = (values) => {
    values.productColor = id;
    const formData = new FormData();
    for (let name in values) {
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
      addImageProduct.mutate(formData, {
        onSuccess: () => {
          setOpen(false);
          queryClient.invalidateQueries({
            queryKey: ["images", id],
            exact: true,
          });
        },
      });
    } else {
      const requestData = {
        newData: formData,
        id: values?._id,
      };
      updateImageProduct.mutate(requestData, {
        onSuccess: () => {
          setOpen(false);
          queryClient.invalidateQueries({
            queryKey: ["images", id],
            exact: true,
          });
        },
      });
    }
  };

  // Add Size
  const addSizeProduct = useMutationHooks((data) => {
    const res = productSizeService.createProductSize(data);
    return res?.data;
  });

  const getAllSizes = useQuery({
    queryKey: ["sizes", id],
    queryFn: () => productSizeService.getAllProductSizes(id),
  });

  const getSizeDetail = useMutationHooks((id) => {
    const res = productSizeService.getProductSizeDetail(id);
    return res;
  });

  const handleUpdateSize = (id) => {
    setOpenSize(true);
    setIsAddMode(false);
    getSizeDetail.mutate(id);
  };

  const updateProductSize = useMutationHooks((data) => {
    const { _id, ...newSize } = data;
    const res = productSizeService.updateProductSize({ _id, newSize });
    return res;
  });

  // Delete
  const deleteProductSize = useMutationHooks(
    (id) => {
      const res = productSizeService.deleteProductSize(id);
      return res;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["sizes", id], exact: true });
      },
    }
  );

  const handleDeleteSize = (id) => {
    deleteProductSize.mutate(id);
  };

  const onSubmitAddSize = (values) => {
    console.log(values);
    if (isAddMode) {
      values.productColor = id;
      addSizeProduct.mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["sizes", id],
            exact: true,
          });
          setOpenSize(false);
        },
      });
    } else {
      updateProductSize.mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["sizes", id],
            exact: true,
          });
          setOpenSize(false);
        },
      });
    }
  };

  return (
    <Container>
      <Typography variant="h4" className="pb-4">
        Thông tin chi tiết sản phẩm
      </Typography>
      {/* Add Images */}
      <ImageModal
        onSubmitAddImage={handleOnSubmitAddImage}
        getAllImages={getAllImages}
        getProductDetailsColor={getProductDetailsColor}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        handleUpdateImage={handleUpdateImage}
        handleDeleteImage={handleDeleteImage}
        open={open}
        isAddMode={isAddMode}
      />
      {/* Add Size */}
      <SizeModal
        onSubmitAddSize={onSubmitAddSize}
        getSizeDetail={getSizeDetail}
        getAllSizes={getAllSizes}
        handleOpenModal={handleOpenSizeModal}
        handleCloseModal={handleCloseSizeModal}
        handleDeleteSize={handleDeleteSize}
        handleUpdateSize={handleUpdateSize}
        open={openSize}
        isAddMode={isAddMode}
      />
      {/* Modal */}
    </Container>
  );
}

export default VariantProduct;
