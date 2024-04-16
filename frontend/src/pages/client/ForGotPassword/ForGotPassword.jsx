import { useForm } from "react-hook-form";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import "./ForgotPassword.scss";
import config from "@/config";
import InputField from "@/components/form-controls/InputField";
import { forgotPassword } from "@/services/authService";
import { useSelector } from "react-redux";
import { schemaForgotPassword } from "@/Validations/yupSchema";
import { toast } from "react-toastify";

function ForGotPassword() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.login?.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaForgotPassword),
  });

  const forgotPasswordMutations = useMutation({
    mutationFn: (values) => forgotPassword(values),
    onSuccess: (response) => {
      toast.success(response?.message);
      navigate("/");
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.error(error.message);
      }
    },
  });

  const handleSubmitForgotPass = (values) => {
    forgotPasswordMutations.mutate(values);
  };
  if (user) return <Navigate to={"/"} />;
  return (
    <div className="wrap-card">
      <div className="card-forgot">
        <form onSubmit={handleSubmit(handleSubmitForgotPass)}>
          <Link to={config.PUBLICROUTER.home}>
            <img
              className="image-header"
              src="https://file.hstatic.net/1000096703/file/logo_website__191___70_px__979fdef210f7474d8a09b42724033b5c.png"
              alt="logo"
            />
          </Link>
          <p>Vui lòng nhập email để tìm kiếm tài khoản của bạn.</p>
          <InputField
            className="passInput"
            validate={register("email")}
            name="email"
            errors={errors}
            type="text"
            placeholder="Email address"
          />
          <button className="btn-send-forgot">Kiểm tra</button>
        </form>
      </div>
    </div>
  );
}

export default ForGotPassword;
