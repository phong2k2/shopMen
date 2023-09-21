import classNames from "classnames/bind"
import styles from "./Profile.module.scss"

const cx = classNames.bind(styles)
function Profile() {
    return ( 
        <div className={cx('container', 'wrap')}>
            <div className={cx('row')}>
                {/* <div className={cx('col-md-2')}>
                    <div className={cx('header-title')}>
                        <a className={cx('image')}>
                            <img src="http://thuthuatphanmem.vn/uploads/2018/09/11/hinh-anh-dep-6_044127357.jpg" alt="" />
                        </a>
                        <div className={cx('action')}>
                            <div className={cx('name')}>boy252002</div>
                            <div className={cx('edit-profile')}>
                                <a href="">Sửa Hồ Sơ</a>
                            </div>
                        </div>
                    </div>
                </div>   */}
    
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
                                                <td className={cx('info')}><div>boy252002</div></td>
                                            </tr>   
                                            <tr>
                                                <td className={cx('title')}><label htmlFor="">Email:</label></td>
                                                <td className={cx('info')}><div>ducphong252002@gmail.com</div></td>
                                            </tr> 
                                            <tr>
                                                <td className={cx('title')}><label htmlFor="">Số điện thoại:</label></td>
                                                <td className={cx('info')}><div>0237332931</div></td>
                                            </tr>
                                            <tr className={cx('box-gender')}>
                                                <td className={cx('title')}><label htmlFor="">Giới tính:</label></td>
                                                <td className={cx('info')}>
                                                    <div className={cx('gender')}>
                                                        <input type="checkbox" />
                                                        <span>Nam</span>
                                                    </div>
                                                    <div className={cx('gender')}>
                                                        <input type="checkbox" />
                                                        <span>Nữ</span>
                                                    </div>
                                                    <div className={cx('gender')}>
                                                        <input type="checkbox" />
                                                        <span>Khác</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>    
                                    </div>
                                </div>

                                {/* <div className={cx('col-md-5')}>
                                    <div className={cx('content-image')}>
                                        <div className={cx('img-right')}><img src="https://hinhanhdephd.com/wp-content/uploads/2017/06/anh-nguoi-dep-hinh-nguoi-mau-de-thuong-nhat-qua-dat-13.jpg" alt="" /></div>
                                        <div className={cx('upload')}><input type="file" /></div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Profile;