import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as userService from "@/services/userService";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
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
import EmptyBox from "@/components/EmptyBox";
import LoadingBackdrop from "@/components/LoadingBackdrop";

function HomeUsers() {
  const [openLoading, setOpenLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data: allUsers } = useQuery({
    queryKey: ["allUsers"],
    queryFn: () => userService.getAllUsers(),
  });

  const deleteUser = useMutation({
    mutationFn: (id) => userService.deleteUser(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: ["allUsers"],
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

  const handleClickDelete = async (id) => {
    setOpenLoading(true);
    deleteUser.mutate(id);
  };
  return (
    <>
      <LoadingBackdrop openLoading={openLoading} />
      <Container>
        <Typography variant="h4" sx={{ fontWeight: "bold" }} className="pb-4 ">
          Danh sách người dùng
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Tên Người dùng</TableCell>
                <TableCell>Chức vụ</TableCell>
                <TableCell>Hình ảnh</TableCell>
                <TableCell>Hành động</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers?.map((user, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user?.username}</TableCell>
                    <TableCell>{user?.role === 1 ? "Admin" : "User"}</TableCell>
                    <TableCell>
                      <img className="img-thumbnail" alt="" />
                    </TableCell>
                    <TableCell>
                      <NavLink
                        className="btn btn-primary ml-3"
                        to={`/admin/user/${user?._id}`}
                      >
                        <Tooltip title="Sửa" placement="top">
                          <BorderColorIcon />
                        </Tooltip>
                      </NavLink>
                      <button
                        className="btn btn-danger ml-3"
                        onClick={() => handleClickDelete(user?._id)}
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
          {allUsers?.length <= 0 && (
            <EmptyBox title="Danh sách người dùng trống." />
          )}
        </TableContainer>
      </Container>
    </>
  );
}

export default HomeUsers;
