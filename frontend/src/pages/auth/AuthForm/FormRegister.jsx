import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import PropTypes from 'prop-types';
import InputField from "@/components/form-controls/InputField/InputField"


function FormRegister({onSubmit}) {
    const schema = yup.object({
        name: yup.string().required('Vui lòng không để trống').min(2, 'Vùi lòng nhập quá 2 ký tự'),
        email: yup.string().email('Email không đúng').required('Vui lòng không để trống'),
        password: yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu cần dài ít nhất 8 ký tự'),
        phone: yup.number()
        .transform((value) => Number.isNaN(value) ? null : value )
        .nullable()
        .required('Vui lòng nhập số điện thoại')
        .min(10, 'Số điện thoại phải 10 chữ số'),
        address: yup.string().required('Vui lòng nhập địa chỉ'),
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
        <form action="" onSubmit={handleSubmit(handleOnSubmit)} >
            <h3 className="pb-3 ">Đăng ký</h3>
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
            <div className="form-group  mt-4  w-100">
              <InputField 
                name={"name"}
                label="Nhập tên"
                register ={register}
                errors= {errors}
                placeholder={"Nhập tên người dùng"}
              />
            </div>
            <div className="form-group  w-100">
                <InputField 
                    name={"email"}
                    label="Nhập email"
                    register ={register}
                    errors= {errors}
                    placeholder={"Nhập email người dùng"}
                />
            </div>
            <div className="form-group  w-100">
                <InputField 
                    name={"password"}
                    label="Nhập mật khẩu"
                    register ={register}
                    errors= {errors}
                    type={"password"}
                    placeholder={"Nhập password người dùng"}
                />
            </div>
            <div className="form-group  w-100">
                <InputField 
                    name={"phone"}
                    label="Nhập số điện thoại"
                    register ={register}
                    errors= {errors}
                    placeholder={"Nhập số điện thoại"}
                />
            </div>
            <div className="form-group  w-100">
                <InputField 
                    name={"address"}
                    label="Nhập địa chỉ"
                    register ={register}
                    errors= {errors}
                    placeholder={"Nhập địa chỉ"}
                />
            </div>
            <button type="submit" className="btn btn-custom">
             ĐĂNG KÝ
            </button>
          </form>
     );
}


FormRegister.propTypes = {
    onSubmit: PropTypes.func,
};

export default FormRegister;