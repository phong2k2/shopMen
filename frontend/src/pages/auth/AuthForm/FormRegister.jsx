import { useForm } from "react-hook-form";
import { forwardRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import InputField from "@/components/form-controls/InputField/InputField";
import "./Form.scss";
import { schemaFormRegister } from "@/Validations/yupSchema";
import { useEffect } from "react";

const initRegister = {
  name: "",
  email: "",
  password: "",
  phone: "",
};
const FormRegister = forwardRef(function FormRegister(
  { handleSubmitRegister, statusRegister },
  ref
) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaFormRegister),
  });

  useEffect(() => {
    if (statusRegister) {
      ref.current.classList.remove("right-pane-active");
      reset(initRegister);
    }
  }, [statusRegister]);

  const handleOnSubmit = (values) => {
    console.log(values);
    handleSubmitRegister(values);
  };
  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <h3 className="pb-2 text-center text-uppercase font-weight-normal title-auth">
        Đăng ký
      </h3>
      <div className="d-flex mb-4 justify-content-center icon">
        <a className="mr-3" href="#">
          <i className="fab fa-facebook text-dark"></i>
        </a>
        <a className="mr-3" href="#">
          <i className="fab fa-google-plus-g text-dark"></i>
        </a>
        <a className="mr-3" href="#">
          <i className="fab fa-linkedin-in text-dark"></i>
        </a>
      </div>
      <div className="form-group w-100">
        <InputField
          name={"name"}
          validate={register("name")}
          errors={errors}
          placeholder={"Nhập tên người dùng"}
        />
      </div>
      <div className="form-group w-100">
        <InputField
          name={"email"}
          validate={register("email")}
          errors={errors}
          placeholder={"Nhập email người dùng"}
        />
      </div>
      <div className="form-group w-100">
        <InputField
          name={"password"}
          validate={register("password")}
          errors={errors}
          type={"password"}
          placeholder={"Nhập password người dùng"}
        />
      </div>
      <div className="form-group w-100">
        <InputField
          name={"phone"}
          validate={register("phone")}
          errors={errors}
          placeholder={"Nhập số điện thoại"}
        />
      </div>
      <button type="submit" className="btn btn-custom">
        ĐĂNG KÝ
      </button>
    </form>
  );
});

FormRegister.propTypes = {
  handleSubmitRegister: PropTypes.func,
  statusRegister: PropTypes.bool,
};

export default FormRegister;
