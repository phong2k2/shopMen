import HttpRequest from "@/utils/httpRequest"

export const createPayment = async (data) => {
  const res = await HttpRequest.post("/v1/payments", data)
  return res?.data
}

export const getAllPayments = async () => {
  try {
    const res = await HttpRequest.get(`/v1/payments`)
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

export const getPaymentDetail = async (id) => {
  try {
    const res = await HttpRequest.get(`/v1/payments/${id}`)
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

export const getClientIdPaypal = async () => {
  try {
    const res = await HttpRequest.get("/v1/payments/configId")
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

export const updatePayment = async (id, data) => {
  try {
    const res = await HttpRequest.update(`/v1/payments/${id}`, data)
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

export const updatePaymentStatus = async (id, newStatus) => {
  try {
    const res = await HttpRequest.post(`/v1/payments/${id}/status`, {
      status: newStatus,
      _method: "PATCH"
    })
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

export const deletePayment = async (id) => {
  try {
    const res = await HttpRequest.delete(`/v1/payments/${id}`)
    return res?.data
  } catch (err) {
    console.log(err)
  }
}

export const createUrlVnPay = async (data) => {
  const res = await HttpRequest.post("/v1/payments/vnpay-payment", data)
  return res?.data
}
