import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import InputField from "@/components/form-controls/InputField/InputField"
import PropTypes from 'prop-types';


function FormLogin({onSubmit}) {
    const schema = yup.object({
        email: yup.string().email('Email không đúng').required('Vui lòng không để trống'),
        password: yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu cần dài ít nhất 8 ký tự'),
    }).required()
   
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      })

    const handleOnSubmit = (values) => {
        onSubmit(values)
    }
    return ( 
      
          <form action="" onSubmit={handleSubmit(handleOnSubmit)}>
            <h3 className="pb-3">Đăng nhập</h3>
            {/* <div className="d-flex mb-3 icon">
              <a className="mr-3" href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a className="mr-3" href="#">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a className="mr-3" href="#">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
            <h6 className="text">Hãy nhập đầy đủ thông tin</h6>
            <div className="form-group mt-4 w-100">
                <InputField
                    name="email"
                    label="Nhập Email"
                    register ={register}
                    errors= {errors}
                />
            </div>
            <div className="form-group  w-100">
                <InputField
                    name="password"
                    label="Nhập password"
                    register ={register}
                    errors= {errors}
                    type={"password"}
                />
            </div>
            <button type="submit" className="btn btn-custom">
              Đăng nhập
            </button>
          </form>
     );
}

FormLogin.propTypes = {
  onSubmit: PropTypes.func,
};


export default FormLogin;