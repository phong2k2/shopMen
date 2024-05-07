import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "@/components/Input";
import * as userService from "@/services/userService";
import config from "@/config";
import { pathProcessing } from "@/helpers/image";

function EditUser() {
  const { id } = useParams();
  const [stateNewUser, setStateNewUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGetEditUser = async () => {
      try {
        const res = await userService.getDetailUser(id);
        if (res) {
          setStateNewUser(res);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchGetEditUser();
  }, []);

  const handleChangeEdit = (e) => {
    const type = e.target.name;
    let value;

    switch (type) {
      case "image":
        value = e.target.files[0];
        break;
      default:
        value = e.target.value;
        break;
    }
    setStateNewUser((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSubmitEditUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const propertiesToAppend = [
      "username",
      "address",
      "image",
      "email",
      "phone",
      "status",
      "role",
    ];
    propertiesToAppend.forEach((property) => {
      formData.append(property, stateNewUser[property]);
    });

    try {
      const res = await userService.updateUser(formData, id);
      if (res) {
        navigate(config.PRIVATEROUTER.indexUser);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mx-2">
      <form onSubmit={handleSubmitEditUser}>
        <Input
          type={"text"}
          onChange={handleChangeEdit}
          value={stateNewUser?.username}
          name={"username"}
          id={"exampleInputEmail1"}
          placeholder={"Tên người dùng"}
        >
          Tên Người dùng
        </Input>

        <Input
          type={"text"}
          onChange={handleChangeEdit}
          value={stateNewUser?.address}
          name={"address"}
          id={"exampleInputName1"}
          placeholder={"Địa chỉ"}
        >
          Địa chỉ
        </Input>

        <Input
          type={"text"}
          onChange={handleChangeEdit}
          value={stateNewUser?.email}
          name={"email"}
          id={"exampleInputName1"}
          placeholder={"Email"}
        >
          Email
        </Input>

        <Input
          type={"number"}
          onChange={handleChangeEdit}
          value={stateNewUser?.phone}
          name={"phone"}
          id={"exampleInputName1"}
          placeholder={"Số điện thoại"}
        >
          Số điện thoại
        </Input>

        <div className="form-group">
          <label>Trạng thái</label>
          <select
            onChange={handleChangeEdit}
            value={stateNewUser?.status}
            className="form-control show-cti form-select list"
            name="status"
            id="cate"
          >
            <option value="">Chọn Trạng thái</option>
            <option value="0">Hiển thị</option>
            <option value="1">Ẩn</option>
          </select>
        </div>

        <div className="form-group">
          <label>Phân quyền</label>
          <select
            onChange={handleChangeEdit}
            value={stateNewUser?.role}
            className="form-control show-cti form-select list"
            name="role"
            id="cate"
          >
            <option value="">Chọn Quyền User</option>
            <option value="0">Người dùng</option>
            <option value="1">Quản trị</option>
          </select>
        </div>

        <div className="row">
          <div className="col-sm-6">
            <Input
              type={"file"}
              onChange={handleChangeEdit}
              name={"image"}
              id={"exampleInputName1"}
            >
              Hình ảnh
            </Input>
          </div>
          <div className="col-sm-6">
            <img
              width="30%"
              src={pathProcessing(stateNewUser?.image)}
              alt="ko có anh"
            />
          </div>
        </div>

        <button className="btn btn-primary">Sửa</button>
      </form>
    </div>
  );
}

export default EditUser;
