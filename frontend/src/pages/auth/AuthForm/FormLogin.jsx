import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import InputField from "@/components/form-controls/InputField/InputField"
import PropTypes from "prop-types"
import "./Form.scss"
import { Link } from "react-router-dom"
import { schemaFormLogin } from "@/validations/yupSchema"
import { PUBLICROUTER } from "@/config/routes"

const initLogin = {
  email: "",
  password: ""
}

function FormLogin({ handleSubmitLogin, statusAuth, messageError }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schemaFormLogin)
  })

  useEffect(() => {
    reset(initLogin)
  }, [statusAuth, reset])

  return (
    <form className="form-login" onSubmit={handleSubmit(handleSubmitLogin)}>
      <h3 className="pb-4 text-center text-uppercase font-semibold title-auth text-5xl">
        Đăng nhập
      </h3>
      <div className="d-flex justify-content-center mb-3 icon">
        <a className="mr-3" href="#">
          <i className="fab fa-facebook text-dark"></i>
        </a>
        <a
          onClick={(e) => {
            e.preventDefault()
            window.open("http://localhost:3000/v1/auth/google", "_self")
          }}
          className="mr-3"
        >
          <i className="fab fa-google-plus-g text-dark"></i>
        </a>
        <a className="mr-3" href="#">
          <i className="fab fa-linkedin-in text-dark"></i>
        </a>
      </div>
      <h6 className="text text-muted mb2 mt-4">Hãy nhập đầy đủ thông tin</h6>
      <div className="form-group mt-4 w-100">
        <InputField
          name="email"
          placeholder="Nhập Email"
          validate={register("email")}
          errors={errors}
        />
      </div>
      <div className="form-group mt-4 w-100">
        <InputField
          name="password"
          placeholder="Nhập password"
          validate={register("password")}
          errors={errors}
          type={"password"}
        />
      </div>
      <div className="auth-actions">
        <Link to={PUBLICROUTER.forGotPassword}>Quên mật khẩu?</Link>
      </div>
      <input type="submit" value="Đăng nhập" className="btn btn-custom" />

      <p className="text-red-600 text-2xl mt-2">
        {messageError ? "Hmmmm, Thông tin đăng nhập không chính xác." : ""}
      </p>
    </form>
  )
}

FormLogin.propTypes = {
  handleSubmitLogin: PropTypes.func,
  statusAuth: PropTypes.bool
}

export default FormLogin
