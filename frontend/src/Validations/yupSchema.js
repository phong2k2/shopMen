import * as yup from "yup";

export const schemaCheckout = yup
.object({
    name: yup.string().required("Vui lòng nhập tên"),
    email: yup
    .string()
    .email("Email không đúng")
    .required("Vui lòng nhập email"),
    phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .min(10, "Bắt buộc phải 10 số")
    .max(11, "Sai định dạng"),
    address: yup.string().required("Vui lòng nhập địa chỉ"),
})
.required();

export const schemaAddress = yup.object({
    name: yup.string().required("Vui lòng nhập tên"),
    email: yup
    .string()
    .email("Email không đúng")
    .required("Vui lòng nhập email"),
    phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .min(10, "Bắt buộc phải 10 số")
    .max(11, "Sai định dạng"),
    address: yup.string().required("Vui lòng nhập địa chỉ"),
})

// Auth
export const schemaFormLogin = yup.object({
    email: yup
        .string()
        .email("Email không đúng định dạng")
        .required("Vui lòng không để trống"),
    password: yup
    .string()
    .required("Vui lòng nhập mật khẩu")
    .min(8, "Mật khẩu cần dài ít nhất 6 ký tự"),
})

export const schemaFormRegister = yup.object({
    name: yup.string().required('Vui lòng không để trống').min(2, 'Vùi lòng nhập quá 2 ký tự'),
    email: yup.string().email('Email không đúng').required('Vui lòng không để trống'),
    password: yup.string().required('Vui lòng nhập mật khẩu').min(8, 'Mật khẩu cần dài ít nhất 8 ký tự'),
    phone: yup.number()
    .transform((value) => Number.isNaN(value) ? null : value )
    .nullable()
    .required('Vui lòng nhập số điện thoại')
    .min(10, 'Số điện thoại phải 10 chữ số'),
})

export const schemaForgotPassword = yup.object({
  email: yup
    .string()
    .email("Email không đúng")
    .required("Vui lòng không để trống"),
})

export const schemaResetPassword = yup
.object({
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Vui lòng không để trống"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
})