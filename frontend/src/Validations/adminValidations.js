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
    discount: yup
      .number()
      .transform((value) => (Number.isNaN(value) ? null : value))
      .nullable()
      .required("Vui lòng nhập giảm giá"),
    // image: yup.mixed()
    //   .test('required', "Vui lòng chọn một hình ảnh", (value) => {
    //     return value.length > 0
    //   })
    //   .test("type", "Chúng tôi chỉ hỗ trợ định dạng jpeg và jpg, png", function (value) {
    //     return value && (value[0]?.type === "image/jpg" || value[0]?.type === "image/jpeg" || value[0]?.type === "image/png");
    //   }),
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