import classNames from "classnames/bind"
import styles from "./Profile.module.scss"
import { useSelector } from "react-redux";
import Image from "@/components/Image";

const cx = classNames.bind(styles)
function Profile() {
    const user = useSelector((state) => state?.auth?.login?.currentUser?.data)

    console.log(user)
    return ( 
        <div className={cx('container', 'wrap')}>
            <div className={cx('row')}>
                <div className={cx('col-md-2')}>
                    <div className={cx('header-title')}>
                        <a className={cx('image')}>
                        <Image
                            className={cx('user-avatar')}
                            src={user?.image}
                            fallBack="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                        />
                        </a>
                        <div className={cx('action')}>
                            <div className={cx('name')}>{user?.username}</div>
                            <div className={cx('edit-profile')}>
                                <a href="">Sửa Hồ Sơ</a>
                            </div>
                        </div>
                    </div>
                </div>  
    
                <div className={cx('col-md-10')}>
                    <div className={cx('content-body')}>
                        <div className={cx('title-body')}>
                            <h1>Hồ sơ của tôi</h1>
                            <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
                        </div>

                        <div className={cx('box-content')}>
                            <div className={cx('row')}>
                                <div className={cx('col-md-7')}>
                                    <div className={cx('information')}>
                                        <table>
                                            <tr>
                                                <td className={cx('title')}> <label htmlFor="">Họ và tên: </label></td>    
                                                <td className={cx('info')}>
                                                    <input type="text" className="input-info" value={user?.username}/>
                                                </td>
                                            </tr>   
                                            <tr>
                                                <td className={cx('title')}><label htmlFor="">Email:</label></td>
                                                <td className={cx('info')}>
                                                    <input type="text" className="input-info" value={user?.email}/>
                                                </td>
                                            </tr> 
                                            <tr>
                                                <td className={cx('title')}><label htmlFor="">Số điện thoại:</label></td>
                                                <td className={cx('info')}>
                                                    <input type="text" className="input-info" value={user?.phone}/>
                                                </td>
                                            </tr>
                                            <tr className={cx('box-gender')}>
                                                <td className={cx('title')}><label htmlFor="">Địa chỉ:</label></td>
                                                <td className={cx('info')}>
                                                    <input type="text" className="input-info" value={user?.address}/>
                                                </td>
                                            </tr>
                                            <tr className={cx('box-gender')}>
                                                <td className={cx('title')}><label htmlFor="">Vai trò:</label></td>
                                                <td className={cx('info')}>
                                                   <div>{user?.role === 0 ? 'Thành viên' : 'Quản trị viên'}</div>
                                                </td>
                                            </tr>
                                        </table>    
                                    </div>
                                </div>

                                <div className={cx('col-md-5')}>
                                    <div className={cx('content-image')}>
                                        <div className={cx('img-right')}>
                                            <Image
                                                className={cx('user-avatar')}
                                                src={user?.image}
                                                fallBack="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                                            />
                                        </div>
                                        <div className={cx('upload')}><input type="file" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Profile;