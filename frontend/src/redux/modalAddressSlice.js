import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isShowModalAddress: false,
  locations: {
    province: null,
    district: null,
    ward: null
  }
}

const modalAddressSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openModalAddress: (state) => {
      state.isShowModalAddress = true
    },
    closeModalAddress: (state) => {
      state.isShowModalAddress = false
    },
    setLocationsAddress: (state, { payload }) => {
      state.locations = payload
    }
  }
})

export const { openModalAddress, closeModalAddress, setLocationsAddress } =
  modalAddressSlice.actions

export default modalAddressSlice.reducer
