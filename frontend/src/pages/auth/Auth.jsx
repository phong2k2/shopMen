import "./Auth.scss";
import { useRef, useState } from "react";
import * as authService from "@/services/authService";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
} from "@/redux/authSlice";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import config from "@/config";
import { toast } from "react-toastify";

import FormLogin from "./AuthForm/FormLogin";
import FormRegister from "./AuthForm/FormRegister";

function Auth() {
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const navigate = useNavigate();
  const { search } = useLocation();
  const user = useSelector((state) => state?.auth?.login?.currentUser);
  const [statusAuth, setStatusAuth] = useState(false);
  const [statusRegister, setStatusRegister] = useState(false);

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

      const queryParams = new URLSearchParams(search);
      const redirectPath = queryParams.get("redirect");
      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate(config.publicRouter.home);
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

  if (user) return <Navigate to={"/"} />;
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
