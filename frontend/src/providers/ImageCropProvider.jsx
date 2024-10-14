import { createContext, useCallback, useContext, useState } from "react"
import getCroppedImg from "../helpers/cropImage"
import PropTypes from "prop-types"

export const ImageCropContext = createContext({})

const defaultImage = null
const defaultCrop = { x: 0, y: 0 }
const defaultZoom = 1
const defaultCroppedAreaPixels = null

const ImageCropProvider = ({ children }) => {
  let max_zoom = 3
  let min_zoom = 1
  let zoom_step = 0.1
  let max_rotation = 360
  let min_rotation = 0
  let rotation_step = 5
  const [image, setImage] = useState(defaultImage)
  const [crop, setCrop] = useState(defaultCrop)
  const [zoom, setZoom] = useState(defaultZoom)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(
    defaultCroppedAreaPixels
  )

  const onCropComplete = useCallback((_croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleZoomIn = () => {
    if (zoom < max_zoom) {
      setZoom(zoom + zoom_step * 2)
    }
  }

  const handleZoomOut = () => {
    if (zoom > min_zoom) {
      setZoom(zoom - zoom_step * 2)
    }
  }

  const getProcessedImage = async () => {
    if (image && croppedAreaPixels) {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels)
      const imageFile = new File([croppedImage.file], `img-${Date.now()}.png`, {
        type: "image/png"
      })
      return imageFile
    }
  }

  const resetStates = () => {
    setImage(defaultImage)
    setCrop(defaultCrop)
    setZoom(defaultZoom)
    setCroppedAreaPixels(defaultCroppedAreaPixels)
  }

  return (
    <ImageCropContext.Provider
      value={{
        image,
        setImage,
        zoom,
        setZoom,
        crop,
        setCrop,
        croppedAreaPixels,
        setCroppedAreaPixels,
        onCropComplete,
        getProcessedImage,
        handleZoomIn,
        handleZoomOut,
        max_zoom,
        min_zoom,
        zoom_step,
        max_rotation,
        min_rotation,
        rotation_step,
        resetStates
      }}
    >
      {children}
    </ImageCropContext.Provider>
  )
}

ImageCropProvider.propTypes = {
  children: PropTypes.node
}

export const useImageCropContext = () => useContext(ImageCropContext)

export default ImageCropProvider
