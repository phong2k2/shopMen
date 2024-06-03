import "./Auth.scss";
import { useRef, useState } from "react";
import * as authService from "@/services/authService";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
} from "@/redux/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormLogin from "./AuthForm/FormLogin";
import FormRegister from "./AuthForm/FormRegister";
import { PUBLICROUTER } from "@/config/routes";

function Auth() {
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const navigate = useNavigate();
  const [statusAuth, setStatusAuth] = useState(false);
  const [statusRegister, setStatusRegister] = useState(false);
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const handleClickSignUp = () => {
    if (divRef.current) {
      divRef.current.classList.add("right-pane-active");
    }
  };
  const handleClickSignIn = () => {
    if (divRef.current) {
      divRef.current.classList.remove("right-pane-active");
    }
  };

  const handleSubmitLogin = async (values) => {
    dispatch(loginStart());
    try {
      const res = await authService.loginUser(values);
      dispatch(loginSuccess(res));

      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate(PUBLICROUTER.home);
      }

      toast.success("Đăng nhập thành công");
      setStatusAuth(true);
    } catch (error) {
      if (error.statusCode !== 500) {
        toast.error(error.message);
        setStatusAuth(false);
      }
    }
  };

  const handleSubmitRegister = async (values) => {
    dispatch(registerStart());
    try {
      const res = await authService.registerUser(values);
      dispatch(registerSuccess(res));
      toast.success("Đăng ký thành công");
      setStatusRegister(true);
    } catch (error) {
      if (error?.statusCode !== 500) {
        toast.error(error.message);
        setStatusAuth((prev) => !prev);
        setStatusRegister(false);
        return;
      }
    }
  };

  return (
    <div className="auth">
      <div ref={divRef} className="container-auth">
        <div className="form-container signUp-container">
          {/* Form Register */}
          <FormRegister
            handleSubmitRegister={handleSubmitRegister}
            statusRegister={statusRegister}
            ref={divRef}
          />
        </div>

        {/* Form Login */}
        <div className="form-container">
          <FormLogin
            handleSubmitLogin={handleSubmitLogin}
            statusAuth={statusAuth}
          />
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className=" ovelaypane overlay-left">
              <h1>Welcome Back!</h1>
              <span>
                To keep connected with us please login with your personal info
              </span>
              <button
                type="submit"
                className="mt-3 btn btn-custom--tem btn-left signIn"
                onClick={handleClickSignIn}
              >
                Log in
              </button>
            </div>
            <div className=" ovelaypane overlay-right">
              <h1>Hello, Friend</h1>
              <span>Enter your personal details and start journey with us</span>
              <button
                type="submit"
                className="mt-3 btn btn-custom--tem signUp"
                onClick={handleClickSignUp}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
