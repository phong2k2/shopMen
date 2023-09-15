import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "@/utils/httpRfreshRequest";
import * as userService from '@/services/adminServices/userService'
import { loginSuccess } from "@/redux/authSlice";
import { getUsersSuccess } from "@/redux/userSlice";
import config from "@/config";

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
                window.location.href = config.privateRouter.indexUser
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
                    allUsers?.map((pro, index) => {
                    return (
                        <tr key={index} >
                            <th scope="row">{index + 1}</th>
                            <td>{pro?.username}</td>
                            <td>
                                {
                                    pro?.admin ? 'Admin' : 'User'
                                }
                            </td>
                            <td>
                                {/* <Link to={`/admin/product/${pro._id}`} >Sửa</Link> */}
                                <button className='btn btn-danger ml-3' onClick={() => handleClickDelete(pro?._id)}>Xóa</button>
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