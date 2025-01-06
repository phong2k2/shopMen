const PaymentService = require("../../../services/v1/PaymentService")
const { StatusCodes } = require("http-status-codes")
const { env } = require("../../../configs/environment")
const querystring = require("qs")
const crypto = require("crypto")
const dayjs = require("dayjs")
const sortObject = require("../../../utils/sortObject")

const PaymentController = {
  // VNPAY
  vnpayPayment: async (req, res, next) => {
    try {
      const {
        body: { totalPrice }
      } = req
      const ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress

      const tmnCode = env.VNP_TMN_CODE
      const secretKey = env.VNP_HASH_SECRET
      let vnpUrl = env.VNP_URL
      const returnUrl = env.VNP_RETURN_URL

      const createDate = dayjs().format("YYYYMMDDHHmmss")
      const orderId = dayjs().format("HHmmss")
      const amount = totalPrice
      const bankCode = "VNBANK"

      var locale = req.body.language

      if (!locale || locale === "") {
        locale = "vn"
      }

      // let vnp_Params = {
      //   vnp_Version: "2.1.0",
      //   vnp_TmnCode: tmnCode,
      //   vnp_TxnRef: orderId,
      //   vnp_Locale: "vn",
      //   vnp_Command: "pay",
      //   vnp_CurrCode: "VND",
      //   vnp_OrderType: "other",
      //   vnp_OrderInfo: `Thanh toan cho ma GD: ${orderId}`,
      //   vnp_IpAddr: ipAddr,
      //   vnp_BankCode: bankCode,
      //   vnp_Amount: amount * 100,
      //   vnp_ReturnUrl: returnUrl,
      //   vnp_CreateDate: createDate
      // }
      var currCode = "VND"
      var vnp_Params = {}
      vnp_Params["vnp_Version"] = "2.1.0"
      vnp_Params["vnp_Command"] = "pay"
      vnp_Params["vnp_TmnCode"] = tmnCode
      vnp_Params["vnp_Locale"] = locale
      vnp_Params["vnp_CurrCode"] = currCode
      vnp_Params["vnp_TxnRef"] = orderId
      vnp_Params["vnp_OrderInfo"] = "new"
      vnp_Params["vnp_OrderType"] = "other"
      vnp_Params["vnp_Amount"] = amount * 100
      vnp_Params["vnp_ReturnUrl"] = returnUrl
      vnp_Params["vnp_IpAddr"] = ipAddr
      vnp_Params["vnp_CreateDate"] = createDate
      if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode
      }

      vnp_Params = sortObject(vnp_Params)
      const signData = querystring.stringify(vnp_Params, { encode: false })
      const hmac = crypto.createHmac("sha512", secretKey)
      const signed = hmac.update(Buffer(signData, "utf-8")).digest("hex")
      vnp_Params["vnp_SecureHash"] = signed
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false })

      res.status(StatusCodes.OK).json({
        data: vnpUrl
      })
    } catch (error) {
      next(error)
    }
  },

  vnpayPaymentReturn: async (req, res, next) => {
    try {
      const response = await PaymentService.vnpayPaymentReturn(req.query)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  vnpayPaymentIPN: async (req, res, next) => {
    try {
      const response = await PaymentService.vnpayPaymentIPN(req.query)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },
  //ADD
  createPayment: async (req, res, next) => {
    try {
      const response = await PaymentService.createPayment(req.body)
      res.status(StatusCodes.CREATED).json(response)
    } catch (error) {
      next(error)
    }
  },
  //Get All
  getAllPayment: async (req, res, next) => {
    try {
      const response = await PaymentService.getAllPayment()
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },
  //Get Detail
  getPaymentDetail: async (req, res, next) => {
    try {
      const id = req.params.id

      const response = await PaymentService.getPaymentDetail(id)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },
  // Get config Paypal
  getConfigPaypal: async (req, res, next) => {
    try {
      const response = await PaymentService.getConfigPaypal()
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },
  //Update Payment
  updatePayment: async (req, res, next) => {
    try {
      const id = req.params.id

      const response = await PaymentService.updatePayment(id, req.body)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },
  //Update status payment
  updateStatusPayment: async (req, res, next) => {
    try {
      const { id } = req.params
      const { status } = req.body

      const response = await PaymentService.updateStatusPayment(id, status)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },
  //Delete a Payment
  deletePayment: async (req, res, next) => {
    try {
      const id = req.params.id

      const response = await PaymentService.deletePayment(id)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PaymentController
