import { useState } from "react";
import "./DetailOrder.module.scss";
import dayjs from "dayjs";
import * as orderService from "@/services/orderService";
import { useLocation, useParams } from "react-router-dom";
import { formatPrice } from "@/components/formatData/formatData";
import {
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
  Box,
  Chip,
  Button,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { orderStatus } from "@/contant";
import { useExcelExport } from "@/hook/useExcelExport";
import LoadingBackdrop from "@/components/LoadingBackdrop";
import { toast } from "react-toastify";

function DetailOrder() {
  const { id } = useParams();
  let location = useLocation();
  const { status } = location.state;
  const [openLoading, setOpenLoading] = useState(false);
  const { generate } = useExcelExport();
  const queryClient = useQueryClient();

  //[Patch] Change status order
  const changeStatusOrderMutation = useMutation({
    mutationFn: (newStatus) => orderService.updateStatus(id, newStatus),
    onSuccess: (response) => {
      setOpenLoading(false);
      queryClient.invalidateQueries({
        queryKey: ["orderDetail", id],
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
  const handleClickChangeStatus = () => {
    if (!status) return;
    const newStatus = orderStatus[status].next;
    if (!newStatus) return;
    setOpenLoading(true);
    changeStatusOrderMutation.mutate(newStatus);
  };

  // Get Order Detail
  const orderDetailQuery = useQuery({
    queryKey: ["orderDetail", id],
    queryFn: () => orderService.getDetailOrder(id),
    enabled: id !== undefined,
  });
  const { data: orderDetails } = orderDetailQuery;

  // Export excel
  const handleDataExport = () => {
    const data = [[1, "Product 1", 5, 100]];
    generate(data, { name: "Order_Detail" }, { ref: "B2" });
  };

  return (
    <>
      <LoadingBackdrop openLoading={openLoading} />
      <Container sx={{marginBottom: 5}}>
        <Typography variant="h4" sx={{ fontWeight: "bold" }} className="pb-4 ">
          Đơn hàng chi tiết
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Paper>
              <Toolbar>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={8}>
                    <Typography
                      sx={{ flex: "1 1 100%" }}
                      variant="h5"
                      id="tableTitle"
                      component="div"
                    >
                      Order ID: {orderDetails?.data?.orderCode}
                    </Typography>
                    <Typography
                      sx={{ flex: "1 1 100%", opacity: ".8" }}
                      variant="h6"
                      id="tableTitle"
                      component="div"
                    >
                      Ngày tạo đơn hàng:{" "}
                      {dayjs(orderDetails?.data?.createdAt).format(
                        "DD/MM/YYYY HH:mm:ss"
                      )}
                      <Chip
                        label={orderStatus[orderDetails?.data?.status]?.title}
                        color={orderStatus[orderDetails?.data?.status]?.color}
                        size="small"
                        sx={{
                          fontSize: "10px",
                          padding: "10px",
                          textAlign: "center",
                          marginLeft: "10px",
                        }}
                      />
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      textAlign: "center",
                    }}
                    xs={4}
                  >
                    {orderStatus[status].next ? (
                      <Button
                        sx={{
                          textAlign: "center",
                          marginLeft: "auto",
                          float: "right",
                        }}
                        variant="contained"
                        onClick={handleClickChangeStatus}
                      >
                        Xác nhận
                      </Button>
                    ) : (
                      ""
                    )}
                    <Button
                      sx={{
                        textAlign: "center",
                        marginLeft: "auto",
                        marginRight: 2,
                        float: "right",
                      }}
                      variant="contained"
                      onClick={handleDataExport}
                    >
                      Export
                    </Button>
                  </Grid>
                </Grid>
              </Toolbar>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: "#334155" }}>
                    <TableRow>
                      <TableCell sx={{ color: "white", fontSize: "12px" }}>
                        Sản phẩm
                      </TableCell>
                      <TableCell sx={{ color: "white", fontSize: "12px" }}>
                        Số lượng
                      </TableCell>
                      <TableCell sx={{ color: "white", fontSize: "12px" }}>
                        Giá
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {orderDetails?.data?.orderItems.map((orderItem, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Grid container>
                            <Grid item xs={2}>
                              <Paper elevation={1}>
                                <Box>
                                  <img src={orderItem?.image} alt="Image" />
                                </Box>
                              </Paper>
                            </Grid>
                            <Grid item xs={10}>
                              <Box ml={4}>
                                <Typography
                                  sx={{ textTransform: "capitalize" }}
                                  variant="h5"
                                >
                                  {orderItem?.name}
                                </Typography>
                                <Typography variant="subtitle2">{`${orderItem?.color} / ${orderItem?.size}`}</Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </TableCell>

                        <TableCell>
                          <Typography variant="h5">
                            {orderItem?.amount}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="h5">
                            {formatPrice(orderItem?.price)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <Paper sx={{ marginBottom: "20px" }}>
              <Toolbar>
                <Typography
                  sx={{ flex: "1 1 100%" }}
                  variant="h6"
                  id="tableTitle"
                  component="div"
                >
                  OrderDetail
                </Typography>
              </Toolbar>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: "#334155" }}>
                    <TableRow>
                      <TableCell sx={{ color: "white", fontSize: "12px" }}>
                        Miêu tả
                      </TableCell>
                      <TableCell sx={{ color: "white", fontSize: "12px" }}>
                        Tổng tiền
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell>Sub Total :</TableCell>
                      <TableCell>$340.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Giảm giá :</TableCell>
                      <TableCell>$340.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phí vận chuyển :</TableCell>
                      <TableCell>$340.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tổng cộng :</TableCell>
                      <TableCell>$340.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>

            <Paper>
              <Toolbar>
                <Typography
                  sx={{ flex: "1 1 100%" }}
                  variant="h6"
                  id="tableTitle"
                  component="div"
                >
                  OrderDetail
                </Typography>
              </Toolbar>
              <TableContainer>
                <Table>
                  <TableHead sx={{ backgroundColor: "#334155" }}>
                    <TableRow>
                      <TableCell sx={{ color: "white", fontSize: "12px" }}>
                        Sản phẩm
                      </TableCell>
                      <TableCell sx={{ color: "white", fontSize: "12px" }}>
                        Số lượng
                      </TableCell>
                      <TableCell sx={{ color: "white", fontSize: "12px" }}>
                        Giá
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    <TableRow>
                      <TableCell>Phương thức thanh toán :</TableCell>
                      <TableCell>Credit Card</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Tên người nhận :</TableCell>
                      <TableCell>Harold Gonzalez</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>SĐT :</TableCell>
                      <TableCell>Harold Gonzalez</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Email :</TableCell>
                      <TableCell>Harold Gonzalez</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Địa chỉ :</TableCell>
                      <TableCell>Harold Gonzalez</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default DetailOrder;
