import { useForm } from "react-hook-form";
import { forwardRef, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";
import InputField from "@/components/form-controls/InputField/InputField";
import "./Form.scss";
import { schemaFormRegister } from "@/validations/yupSchema";
import { useEffect } from "react";
import * as authService from "@/services/authService";
import { CircularProgress } from "@mui/material";

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
  const [visible, setVisible] = useState(true);
  const [dashoffset, setDashoffset] = useState(0);
  const [showInputOtp, setShowInputOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldStartInterval, setShouldStartInterval] = useState(false);
  const svgRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
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
    handleSubmitRegister(values);
  };

  const handleVerifyEmail = async () => {
    try {
      setIsLoading(true);
      const email = getValues("email");
      const res = await authService.sendVerifyEmail(email);
      if (res.message) {
        setVisible(false);
        setShouldStartInterval(true);
        setShowInputOtp(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!shouldStartInterval) return;

    const intervalId = setInterval(() => {
      setDashoffset((prevDashoffset) => {
        const newDashoffset = prevDashoffset - 1.2;
        if (newDashoffset < -72) {
          return 0;
        }
        return newDashoffset;
      });
    }, 1000);

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setShouldStartInterval(false);
      setInterval(0);
    }, 60000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [shouldStartInterval]);

  useEffect(() => {
    if (svgRef.current) {
      svgRef.current.setAttribute("stroke-dashoffset", dashoffset);
    }
  }, [dashoffset]);

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
      <div className="form-group d-flex">
        <InputField
          name={"email"}
          validate={register("email")}
          errors={errors}
          placeholder={"Nhập email người dùng"}
        />
        {visible && (
          <div className="btn-send-verify">
            {isLoading ? (
              <CircularProgress size={30} color="warning" />
            ) : (
              <div
                onClick={handleVerifyEmail}
                className="btn btn-primary send-verify"
              >
                Send
              </div>
            )}
          </div>
        )}
      </div>
      {showInputOtp ? (
        <div className="form-group input-code">
          <InputField
            name={"code"}
            validate={register("code")}
            errors={errors}
            placeholder={"Verify Code"}
          />
          {shouldStartInterval ? (
            <div className="time-verify">
              <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m 12.5,1 a 11.5,11.5 0 1,0 0,23 a 11.5,11.5 0 1,0 0,-23"
                  fill="none"
                  stroke="#d9d9d9"
                  strokeWidth="2"
                ></path>
                <path
                  ref={svgRef}
                  d="m 12.5,1 a 11.5,11.5 0 1,0 0,23 a 11.5,11.5 0 1,0 0,-23"
                  fill="none"
                  stroke="rgba(0, 71, 119, 1)"
                  strokeLinecap="round"
                  strokeWidth="2"
                  strokeDasharray="72"
                  strokeDashoffset="0"
                ></path>
              </svg>
            </div>
          ) : isLoading ? (
            <CircularProgress size={30} color="warning" />
          ) : (
            <div
              onClick={handleVerifyEmail}
              className="btn btn-danger btn-again-send"
            >
              <p>Gửi lại mã</p>
            </div>
          )}
        </div>
      ) : (
        ""
      )}

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
