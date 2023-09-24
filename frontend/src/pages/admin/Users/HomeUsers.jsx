import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "@/utils/httpRfreshRequest";
import * as userService from '@/services/adminServices/userService'
import { loginSuccess } from "@/redux/authSlice";
import { getUsersSuccess } from "@/redux/userSlice";
import { Link } from "react-router-dom";

function HomeUsers() {
    const user = useSelector((state) => state.auth.login.currentUser)
    const allUsers = useSelector((state) => state.user.users.allUsers)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(user, dispatch, loginSuccess)
    const accessToken = user?.accessToken
    useEffect(() => {
        const getAllUsersApi = async () => {
            try {
                if(accessToken){
                    const res = await userService.getAllUsers(accessToken,dispatch, axiosJWT);
                    if(res) {
                        dispatch(getUsersSuccess(res.data))
                    }}
            }catch( err) {
                console.log(err);
            }
        }
        getAllUsersApi()
    },[])

    const handleClickDelete = async (id) => {
        try {
            const res = await userService.deleteUser(user?.accessToken, id, axiosJWT )
            if(res) {
                const userAfterDelete = allUsers?.filter((val) => {
                    return val._id !== id
                })
                dispatch(getUsersSuccess(userAfterDelete))
            }
        }catch (err) {
            console.log(err);
        }
    }
    return ( 
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên Người dùng</th>
                    <th scope="col">Chức vụ</th>
                    <th rowSpan={2} scope="col">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {
                    allUsers?.map((user, index) => {
                    return (
                        <tr key={index} >
                            <th scope="row">{index + 1}</th>
                            <td>{user?.username}</td>
                            <td>
                                {
                                    user?.role === 1 ? 'Admin' : 'User'
                                }
                            </td>
                            <td>
                                <Link className='btn btn-primary ml-3' to={`/admin/user/${user?._id}`} >Sửa</Link>
                                <button className='btn btn-danger ml-3' onClick={() => handleClickDelete(user?._id)}>Xóa</button>
                            </td>
                        </tr>
                    )
                    })
                }
            </tbody>
    </table>
     );
}

export default HomeUsers;