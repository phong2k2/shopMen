import * as yup from "yup";

export const schemaHandleProduct = yup.object().shape({
    name: yup.string().required("Vui lòng nhập tên"),
    price: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("Vui lòng nhập giá"),
    countInStock: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("Vui lòng nhập số lượng"),
      salePrice: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("Vui lòng nhập giảm giá"),
    category: yup.string().required("Vui lòng chọn danh mục"),
    subCategory: yup.string().required("Vui lòng chọn loại sản phẩm"),
    hot: yup.string().required("Vui lòng chọn trạng thái"),
    description: yup
      .string()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("Vui lòng điền mô tả sản phẩm."),
  });

  export const schemaColor = yup.object().shape({
    nameColor: yup.string().required("Vui chọn màu sắc"),
    price: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("Vui lòng nhập giá"),
  });