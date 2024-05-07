import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import "./ResetPassword.scss";
import config from "@/config";
import InputField from "@/components/form-controls/InputField";
import { resetPassword } from "@/services/authService";
import { toast } from "react-toastify";
import { schemaResetPassword } from "@/validations/yupSchema";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const code = searchParams.get("code");
  const navigate = useNavigate();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaResetPassword),
  });

  const resetPasswordMutations = useMutation({
    mutationFn: (values) => resetPassword(userId, code, values),
    onSuccess: (response) => {
      toast.success(response.message);
      navigate(config.PUBLICROUTER.auth);
    },
    onError: (error) => {
      if (error?.statusCode !== 500) {
        toast.error(error?.message);
        reset({
          password: "",
          confirmPassword: "",
        });
      }
    },
  });

  const handleSubmitRestPassword = (values) => {
    resetPasswordMutations.mutate(values);
  };

  return (
    <div className="wrap-card">
      <div className="card-reset">
        <Link to={config.PUBLICROUTER.home}>
          <img
            className="image-header"
            src="https://file.hstatic.net/1000096703/file/logo_website__191___70_px__979fdef210f7474d8a09b42724033b5c.png"
            alt="logo"
          />
        </Link>
        <form
          className="form-reset"
          onSubmit={handleSubmit(handleSubmitRestPassword)}
        >
          {/* <h2>Reset Password?</h2> */}
          <p>You can reset your Password here</p>
          <div className="form-group">
            <InputField
              className="passInput"
              validate={register("password")}
              name="password"
              errors={errors}
              type="password"
              placeholder="Mật khẩu mới"
            />
          </div>
          <div className="form-group">
            <InputField
              className="passInput"
              validate={register("confirmPassword")}
              name="confirmPassword"
              errors={errors}
              type="password"
              placeholder="Nhập lại password"
            />
          </div>
          <button className="btn-send">Tạo lại mật khẩu</button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
