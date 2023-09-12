import "./Auth.scss";
import { useRef, useState } from "react";
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

const state = () => {
  return {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: 0,
    image: "",
    address: "",
  };
};
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stateRegister, setStateRegister] = useState(state());
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

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await authService.loginUser({ email, password });
      
      if (res) {
        dispatch(loginSuccess(res));
        navigate(config.publicRouter.home)
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    dispatch(registerStart());
    try {
      const res = await authService.registerUser(stateRegister);
      if (res) {
        dispatch(registerSuccess(res));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangInput = (e) => {
    setStateRegister((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="auth">
      <h1 className="pb-4 text-center header">
        Weekly Coding Challenge #1: Sign in/up Form
      </h1>
      <div ref={divRef} className="container ">
        <div className="form-container signUp-container">
          <form action="" onSubmit={handleSubmitRegister}>
            <h3 className="pb-3">Create Account</h3>
            <div className="d-flex mb-3 icon">
              <a className="mr-3" href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a className="mr-3" href="#">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a className="mr-3" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div className="form-group w-100">
              <input
                onChange={handleChangInput}
                name="name"
                type="text"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div className="form-group w-100">
              <input
                onChange={handleChangInput}
                name="email"
                type="text"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="form-group w-100">
              <input
                onChange={handleChangInput}
                name="password"
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="form-group w-100">
              <input
                onChange={handleChangInput}
                name="confirmPassword"
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="form-group w-100">
              <input
                onChange={handleChangInput}
                name="image"
                type="file"
                className="form-control"
                placeholder=""
              />
            </div>
            <div className="form-group w-100">
              <input
                onChange={handleChangInput}
                name="phone"
                type="text"
                className="form-control"
                placeholder="Phone"
              />
            </div>
            <div className="form-group w-100">
              <input
                onChange={handleChangInput}
                name="address"
                type="text"
                className="form-control"
                placeholder="Địa chỉ"
              />
            </div>
            <button type="submit" className="btn btn-custom">
              SIGN UP
            </button>
          </form>
        </div>
        <div className="form-container">
          <form action="" onSubmit={handleSubmitLogin}>
            <h3 className="pb-3">Sign in</h3>
            <div className="d-flex mb-3 icon">
              <a className="mr-3" href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a className="mr-3" href="#">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a className="mr-3" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <h6 className="text">or use your account</h6>
            <div className="form-group w-100">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="form-group w-100">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="forgot-pass mb-3">Forgot your password?</div>
            <button type="submit" className="btn btn-custom">
              SIGN IN
            </button>
          </form>
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
                Sing in
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
                Sing up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
