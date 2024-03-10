import { readFile } from "@/helpers/cropImage";
import Cropper from "./Cropper";
import PropTypes from "prop-types";
import { ZoomSlider } from "./Sliders";
import { useImageCropContext } from "@/providers/ImageCropProvider";

const ImageCropModalContent = ({ handleDone, handleClose }) => {
  const { setImage } = useImageCropContext();

  const handleFileChange = async ({ target: { files } }) => {
    const file = files && files[0];
    const imageDataUrl = await readFile(file);
    setImage(imageDataUrl);
  };

  return (
    <div className="text-center relative">
      <h5 className="text-gray-800 mb-4">Edit profile picture</h5>
      <div className="border border-dashed border-gray-200 p-6 rounded-lg">
        <div className="flex justify-center">
          <div className="crop-container mb-4">
            <Cropper />
          </div>
        </div>
        <ZoomSlider className="mb-4" />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="avatarInput"
          accept="image/*"
        />

        <button className="shadow w-full mb-4 hover:shadow-lg">
          <label htmlFor="avatarInput">Upload Another Picture</label>
        </button>
        <div className="flex gap-2">
          <button
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleDone}
          >
            Done & Save
          </button>
        </div>
      </div>
    </div>
  );
};

ImageCropModalContent.propTypes = {
  handleDone: PropTypes.func,
  handleClose: PropTypes.func,
};

export default ImageCropModalContent;
