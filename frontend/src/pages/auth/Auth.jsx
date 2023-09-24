import "./Auth.scss";
import { useRef } from "react";
import * as authService from "@/services/authServices/authService";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
} from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import config from "@/config";
import toastify from "@/components/toastify/toastify";

import FormLogin from "./AuthForm/FormLogin";
import FormRegister from "./AuthForm/FormRegister";


function Auth() {
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const navigate = useNavigate();

 
  const handleClickSingup = () => {
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
      const {email, password} = values
      const res = await authService.loginUser({ email, password });
      if (res?.data) {
        dispatch(loginSuccess(res));
        navigate(config.publicRouter.home)
        toastify({
          type: 'success',
          message: "Đăng nhập thành công"
        })
      }else{
        toastify({
          type: 'error',
          message: "Đăng nhập thất bại"
        })
        navigate(config.publicRouter.auth)
      }
    } catch (err) {
      console.log(err)
    }
  };

  const handleSubmitRegister = async (values) => {
    console.log(values)
    dispatch(registerStart());
    try {
      const res = await authService.registerUser(values);
      console.log(res)
      if (res) {
        dispatch(registerSuccess(res));
        toastify({
          type: 'success',
          message: "Đăng ký thành công"
        })
        // window.location.reload()
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="auth">
      <h1 className="pb-4 text-center header">
      </h1>
      <div ref={divRef} className="container ">
        <div className="form-container signUp-container">
          {/* Form Register */}
          <FormRegister onSubmit={handleSubmitRegister}/>
        </div>
        
        {/* Form Login */}
        <div className="form-container">
          <FormLogin onSubmit={handleSubmitLogin}/>
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
                onClick={handleClickSingup}
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
