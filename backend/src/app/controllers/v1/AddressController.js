const AddressService = require("../../../services/v1/AddressService")
const { StatusCodes } = require("http-status-codes")
const pick = require("../../../utils/pick")

const AddressController = {
  getAllUserAddress: async (req, res, next) => {
    try {
      const { query } = req
      const filter = pick(query, ["userId", "status"])
      const options = pick(query, ["sortBy", "limit", "page"])
      const response = await AddressService.getAllUserAddress(filter, options)

      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  getAddressDetail: async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await AddressService.getAddressDetail(id)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  getAddressOrder: async (req, res, next) => {
    try {
      const { userId } = req.params

      const response = await AddressService.getAddressOrder(userId)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  createAddress: async (req, res, next) => {
    try {
      const address = req.body
      const response = await AddressService.createAddress(address)
      res.status(StatusCodes.CREATED).json(response)
    } catch (error) {
      next(error)
    }
  },

  updateAddress: async (req, res, next) => {
    try {
      const { id } = req.params
      const newAddress = req.body
      const response = await AddressService.updateAddress(id, newAddress)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  },

  deleteAddress: async (req, res, next) => {
    try {
      const { id } = req.params
      const response = await AddressService.deleteAddress(id)
      res.status(StatusCodes.OK).json(response)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = AddressController
