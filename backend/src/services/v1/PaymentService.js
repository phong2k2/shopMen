const { StatusCodes } = require("http-status-codes")
const Payment = require("../../app/model/Payment")
const ApiError = require("../../utils/ApiError")
const { env } = require("../../configs/environment")
const querystring = require("qs")
const crypto = require("crypto")
const dayjs = require("dayjs")
const sortObject = require("../../utils/sortObject")

//VNPAY
const createUrlVnpayPayment = async (ipAddr, data) => {
  try {
    const tmnCode = env.VNP_TMN_CODE
    const secretKey = env.VNP_HASH_SECRET
    let vnpUrl = env.VNP_URL
    const returnUrl = env.VNP_RETURN_URL

    const createDate = dayjs().format("YYYYMMDDHHmmss")
    const orderId = dayjs().format("HHmmss")
    const amount = data.totalPrice
    const bankCode = "VNBANK"

    // const orderInfo = data.orderDescription
    // const orderType = data.orderType
    let locale
    if (locale === null || locale === "") {
      locale = "vn"
    }

    let vnp_Params = {
      vnp_Version: "2.1.0",
      vnp_TmnCode: tmnCode,
      vnp_TxnRef: orderId,
      vnp_Locale: locale,
      vnp_Command: "pay",
      vnp_CurrCode: "VND",
      vnp_OrderType: "other",
      vnp_OrderInfo: `Thanh toan cho ma GD: ${orderId}`,
      vnp_IpAddr: ipAddr,
      vnp_BankCode: bankCode,
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_CreateDate: createDate
    }

    vnp_Params = sortObject(vnp_Params)
    const signData = querystring.stringify(vnp_Params, { encode: false })
    const hmac = crypto.createHmac("sha512", secretKey)
    const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex")
    vnp_Params["vnp_SecureHash"] = signed
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false })

    console.log("🚀 ~ vnpUrl:", vnpUrl)

    return {
      data: vnpUrl
    }
  } catch (error) {
    throw error
  }
}

const vnpayPaymentReturn = async (query) => {
  try {
    let vnp_Params = query
    let secureHash = vnp_Params["vnp_SecureHash"]

    delete vnp_Params["vnp_SecureHash"]
    delete vnp_Params["vnp_SecureHashType"]

    vnp_Params = sortObject(vnp_Params)
    const tmnCode = env.VNP_TMN_CODE
    const secretKey = env.VNP_HASH_SECRET

    let signData = querystring.stringify(vnp_Params, { encode: false })
    let hmac = crypto.createHmac("sha512", secretKey)
    let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex")

    if (secureHash === signed) {
      //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
      return { code: vnp_Params["vnp_ResponseCode"] }
    } else {
      return { code: "97" }
    }
  } catch (error) {
    throw error
  }
}

const vnpayPaymentIPN = async (query) => {
  try {
    var vnp_Params = query
    var secureHash = vnp_Params["vnp_SecureHash"]

    delete vnp_Params["vnp_SecureHash"]
    delete vnp_Params["vnp_SecureHashType"]

    const a = {
      vnp_Amount: "1000000",
      vnp_BankCode: "NCB",
      vnp_OrderInfo: "Thanh toan cho ma GD: 65709fb439d5206b65edc7cba",
      vnp_ResponseCode: "00",
      vnp_TmnCode: "3NMI7ODW",
      vnp_TransactionNo: "14224059",
      vnp_TxnRef: "65709fb439d5206b65edc7cba"
    }

    // const params = sortObject(vnpParams);
    const signData = querystring.stringify(a, { encode: false })
    // eslint-disable-next-line global-require
    const cryptos = require("crypto")
    const hmac = cryptos.createHmac("sha512", VNP.HASH_SECRET)
    // eslint-disable-next-line security/detect-new-buffer, no-buffer-constructor
    const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex")

    const paymentStatus = "0" // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
    // let paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
    // let paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

    const checkOrderId = true // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
    const checkAmount = true // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
    // eslint-disable-next-line no-console
    console.log(secureHash, "secureHash")
    // eslint-disable-next-line no-console
    console.log(signed, "signed")
    if (secureHash === signed) {
      if (checkOrderId) {
        if (checkAmount) {
          if (paymentStatus === "0") {
            // kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
            if (rspCode === "00") {
              // thanh cong
              // paymentStatus = '1'
              // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
              // eslint-disable-next-line no-console
              console.log("checkOrderId", checkOrderId)
              // eslint-disable-next-line no-console
              console.log("checkAmount", checkAmount)
              res.success({
                rspCode,
                Message: "Payment successful"
              })
            } else {
              // that bai
              // paymentStatus = '2'
              // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
              res.redirect(`http://localhost:5173/checkout`)
              // res.status(200).json({ rspCode, Message: "Giao dịch thất bại" });
            }
          } else {
            res.error("This order has been updated to the payment status", {
              RspCode: "02"
            })
          }
        } else {
          res.error("Amount invalid", { RspCode: "02" })
        }
      } else {
        res.error("Order not found", { RspCode: "01" })
      }
    } else {
      res.error("Checksum failed", { RspCode: "97" })
    }
  } catch (error) {
    throw error
  }
}

const createPayment = async (body) => {
  try {
    const checkPayment = await Payment.findOne({ name: body.name })
    if (checkPayment) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Payment not found")
    }

    const newPayment = await Payment.create(body)

    return {
      data: newPayment
    }
  } catch (error) {
    throw error
  }
}

const getAllPayment = async () => {
  try {
    const getAllPayment = await Payment.find({})

    return {
      data: getAllPayment
    }
  } catch (error) {
    throw error
  }
}

const getPaymentDetail = async (id) => {
  try {
    const PaymentDetail = await Payment.findOne({
      _id: id
    })

    return {
      data: PaymentDetail
    }
  } catch (error) {
    throw error
  }
}

const getConfigPaypal = async () => {
  try {
    const clientId = env.CLIENT_ID

    return {
      data: clientId
    }
  } catch (error) {
    throw error
  }
}

const updatePayment = async (id, body) => {
  try {
    const checkPayment = await Payment.findOne({ _id: id })
    if (!checkPayment) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Payment not found")
    }
    const updatePayment = await Payment.findOneAndUpdate({ _id: id }, body, {
      new: true
    })

    return {
      data: updatePayment
    }
  } catch (error) {
    throw error
  }
}

const updateStatusPayment = async (id, status) => {
  try {
    const checkPayment = await Payment.findOne({ _id: id })
    if (!checkPayment) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Payment not found")
    }

    const updatePayment = await Payment.findOneAndUpdate(
      { _id: id },
      { $set: { status: status } },
      { new: true }
    )

    return {
      data: updatePayment
    }
  } catch (error) {
    throw error
  }
}

const deletePayment = async (id) => {
  try {
    const checkPayment = await Payment.findOne({ _id: id })
    if (!checkPayment) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Payment not found")
    }

    await Payment.findOneAndDelete({ _id: id })

    return {
      message: "Delete Success"
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  createPayment,
  getAllPayment,
  getPaymentDetail,
  getConfigPaypal,
  updatePayment,
  updateStatusPayment,
  deletePayment,
  createUrlVnpayPayment,
  vnpayPaymentReturn,
  vnpayPaymentIPN
}
