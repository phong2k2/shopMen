import * as productService from "@/services/productService";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EmptyBox from "@/components/EmptyBox";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import { useState } from "react";

function HomeProduct() {
  const [openLoading, setOpenLoading] = useState(false);
  const queryClient = useQueryClient();
  const page = 1;
  const sort = ["name", "asc"];

  // Get All Products
  const getProductApi = async (context) => {
    const page = context?.queryKey && context?.queryKey[1];
    const sort = context?.queryKey && context?.queryKey[2];
    const res = await productService.getAllProducts({
      page,
      sort,
    });
    return res;
  };

  // Delete product
  const handleDeleteProduct = (id, publicId) => {
    setOpenLoading(true);
    deleteProductMutation.mutate({ id, publicId });
  };

  const getProductQuery = useQuery({
    queryKey: ["products", page, sort],
    queryFn: getProductApi,
  });
  const { data: allProduct } = getProductQuery;

  const deleteProductMutation = useMutation({
    mutationFn: (data) => {
      const { id, publicId } = data;
      const res = productService.deleteProduct(id, publicId);
      return res;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["products", page, sort],
        exact: true,
      });
      setOpenLoading(false);
      toast.success(response.message);
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.success(error.message);
      }
      setOpenLoading(false);
    },
  });
  return (
    <>
      <LoadingBackdrop openLoading={openLoading} />
      <Container>
        <Typography variant="h4" sx={{ fontWeight: "bold" }} className="pb-4 ">
          Sản phẩm
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Tên sản phẩm</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allProduct?.map((pro, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      {pro?.subCategory?.name || pro?.category?.name}
                    </TableCell>
                    <TableCell>{pro?.name}</TableCell>
                    <TableCell>
                      <img
                        className="img-thumbnail"
                        src={pro?.image?.url}
                        alt=""
                      />
                    </TableCell>
                    <TableCell>
                      <Link
                        className="btn btn-primary mr-2"
                        to={`/admin/variant/${pro?._id}`}
                      >
                        <Tooltip title="Xem chi tiết" placement="top">
                          <RemoveRedEyeIcon />
                        </Tooltip>
                      </Link>
                      <Link
                        className="btn btn-primary"
                        to={`/admin/product/${pro?.slug}`}
                      >
                        <Tooltip title="Sửa" placement="top">
                          <BorderColorIcon />
                        </Tooltip>
                      </Link>
                      <button
                        className="btn btn-danger ml-2"
                        onClick={() =>
                          handleDeleteProduct(pro?._id, pro?.image?.publicId)
                        }
                      >
                        <Tooltip title="Xóa" placement="top">
                          <DeleteForeverIcon />
                        </Tooltip>
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {allProduct?.length <= 0 && (
            <EmptyBox title="Danh sách sản phẩm trống." />
          )}
        </TableContainer>
      </Container>
    </>
  );
}

export default HomeProduct;
