import classNames from "classnames/bind";
import styles from "./Account.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import * as yup from "yup";
import Image from "@/components/Image";
import InputField from "@/components/form-controls/InputField/InputField";
import * as userService from "@/services/userService";
import { loginSuccess } from "@/redux/authSlice";
import toastify from "@/components/toastify/toastify";

const cx = classNames.bind(styles);
function Account() {
  const user = useSelector((state) => state?.auth?.login?.currentUser);
  const [userProfile, setUserProfile] = useState(user?.data);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const fileInputRef = useRef();
  console.log(user);
  const schema = yup
    .object({
      // email: yup.string().email('Email không đúng').required('Vui lòng không để trống'),
      // password: yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu cần dài ít nhất 8 ký tự'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickSelectInput = () => {
    fileInputRef.current.click();
  };

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    for (let name in userProfile) {
      formData.append(name, userProfile[name]);
    }
    try {
      const res = await userService.updateUser(formData, userProfile?._id);
      if (res?.data) {
        dispatch(
          loginSuccess({
            ...user,
            data: {
              ...res?.data,
            },
          })
        );

        setUserProfile(res?.data);
        toastify({
          type: "success",
          message: "Cập nhật hồ sơ thành công",
        });
      }
    } catch (err) {
      toastify({
        type: "error",
        message: "Cập nhật hồ sơ thất bại",
      });
    }
  };

  const handleInputChange = (e) => {
    const type = e.target.name;
    let value;

    switch (type) {
      case "image":
        value = e.target.files[0];
        if (value) {
          // Lấy URL của ảnh đã chọn
          const imageUrl = URL.createObjectURL(value);
          setSelectedImage(imageUrl);
        }
        break;
      default:
        value = e.target.value;
        break;
    }
    setUserProfile({
      ...userProfile,
      [type]: value,
    });
  };
  return (
    <div className={cx("content-body")}>
      <div className={cx("title-body")}>
        <h1>Hồ sơ của tôi</h1>
        <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>

      <div className={cx("box-content")}>
        <form onSubmit={handleSubmit(handleUpdateProfile)}>
          <div className={cx("row")}>
            <div className={cx("col-md-7")}>
              <div className={cx("information")}>
                <table>
                  <tbody>
                    <tr>
                      <td className={cx("title")}>
                        {" "}
                        <label htmlFor="">Họ và tên: </label>
                      </td>
                      <td className={cx("info")}>
                        <InputField
                          type="text"
                          onChange={handleInputChange}
                          className=" input-info"
                          value={userProfile?.username}
                          name="username"
                          validate={register("username")}
                          errors={errors}
                        />
                        {/* <input /> */}
                      </td>
                    </tr>
                    <tr>
                      <td className={cx("title")}>
                        <label htmlFor="">Email:</label>
                      </td>
                      <td className={cx("info")}>
                        <InputField
                          type="text"
                          onChange={handleInputChange}
                          className=" input-info"
                          value={userProfile?.email}
                          name="email"
                          validate={register("email")}
                          errors={errors}
                        />
                        {/* <input type="text" className={cx("input-info", "")} value={userProfile?.email}/> */}
                      </td>
                    </tr>
                    <tr>
                      <td className={cx("title")}>
                        <label htmlFor="">Số điện thoại:</label>
                      </td>
                      <td className={cx("info")}>
                        <InputField
                          type="text"
                          onChange={handleInputChange}
                          className=" input-info"
                          value={userProfile?.phone}
                          name="phone"
                          validate={register("phone")}
                          errors={errors}
                        />
                        {/* <input type="text" className={cx("input-info", "")} value={userProfile?.phone}/> */}
                      </td>
                    </tr>
                    <tr className={cx("box-gender")}>
                      <td className={cx("title")}>
                        <label htmlFor="">Vai trò:</label>
                      </td>
                      <td className={cx("info")}>
                        <div className={cx("input-info")}>
                          {user?.data?.role === 0
                            ? "Thành viên"
                            : "Quản trị viên"}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={cx("col-md-5")}>
              <div className={cx("content-image")}>
                <div className={cx("img-right")}>
                  <Image
                    className={cx("user-avatar")}
                    src={selectedImage || user?.image?.url || user?.data?.image}
                    fallBack="https://fullstack.edu.vn/static/media/fallback-avatar.155cdb2376c5d99ea151.jpg"
                  />
                </div>
                <div className={cx("upload")}>
                  <input
                    ref={fileInputRef}
                    onChange={handleInputChange}
                    name="image"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                  />
                  <button
                    onClick={handleClickSelectInput}
                    type="button"
                    className={cx("btn btn-light", "btn--inline")}
                  >
                    Chọn Ảnh
                  </button>
                </div>
              </div>
            </div>
            <div className={cx("col-md-12")}>
              <div className={cx("div-button")}>
                <button
                  type="submit"
                  className={cx("btn btn-primary mr-3 ", "submit-profile")}
                >
                  Lưu
                </button>
                {/* <button type="submit" className={cx('btn btn-dangezr', 'submit-profile')}>Hủy</button> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Account;
