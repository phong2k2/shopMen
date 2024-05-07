import { useState } from "react";
import * as orderService from "@/services/orderService";
import { formatPrice } from "@/components/formatData/formatData";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Tooltip,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useMutation, useQuery, useQueryClient } from "react-query";
import dayjs from "dayjs";
import { orderStatus } from "@/contant";
import EmptyBox from "@/components/EmptyBox";
import { toast } from "react-toastify";
import LoadingBackdrop from "@/components/LoadingBackdrop";

function ListOrderStatus() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const [openLoading, setOpenLoading] = useState(false);

  const status = searchParams.get("status");
  const user = searchParams.get("userId");

  // Get list orders
  const { data: listOrders } = useQuery({
    queryKey: ["listOrder", status],
    queryFn: () => orderService.getAllOrderStatus({ status, user }),
    enabled: status !== undefined,
  });

  const deleteOrderMutation = useMutation({
    mutationFn: (id) => orderService.deleteOrder(id),
    onSuccess: (response) => {
      setOpenLoading(false);
      queryClient.invalidateQueries({
        queryKey: ["listOrder", status],
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

  const handleDeleteOrder = (id) => {
    deleteOrderMutation.mutate(id);
  };

  const handleClickNextOrderDetail = (id) => {
    navigate(`/admin/order/detail/${id}`, { state: { status } });
  };

  return (
    <>
      <LoadingBackdrop openLoading={openLoading} />
      <Container>
        <Typography variant="h4" sx={{ fontWeight: "bold" }} className="pb-4 ">
          Đơn hàng
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Mã đơn hàng</TableCell>
                <TableCell>Thời gian đặt hàng</TableCell>
                <TableCell>Tổng tiền</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Tên khách hàng</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listOrders?.map((itemOrder, index) => {
                const color = orderStatus[itemOrder?.status].color;
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{itemOrder?.orderCode}</TableCell>
                    <TableCell>
                      {dayjs(itemOrder?.itemOrder?.createdAt).format(
                        "DD/MM/YYYY HH:mm:ss"
                      )}
                    </TableCell>
                    <TableCell>{formatPrice(itemOrder?.totalPrice)}</TableCell>
                    <TableCell>
                      <Chip
                        label={orderStatus[itemOrder?.status].title}
                        color={color}
                        variant="outlined"
                        size="small"
                        sx={{
                          fontSize: "10px",
                          padding: "10px",
                          textAlign: "center",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {itemOrder?.shippingAddress?.fullName}
                    </TableCell>

                    <TableCell>
                      <a
                        className="btn btn-primary ml-3"
                        onClick={() =>
                          handleClickNextOrderDetail(itemOrder?._id)
                        }
                      >
                        <Tooltip title="Chi tiết" placement="top">
                          <RemoveRedEyeIcon />
                        </Tooltip>
                      </a>
                      <button
                        className="btn btn-danger ml-3"
                        onClick={() => handleDeleteOrder(itemOrder?._id)}
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
          {listOrders?.length <= 0 && (
            <EmptyBox title="Danh sách đơn hàng trống." />
          )}
        </TableContainer>
      </Container>
    </>
  );
}

export default ListOrderStatus;
