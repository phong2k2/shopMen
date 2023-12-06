import { toast } from "react-toastify";

// const options = {
//   position: "top-right",
//   theme: "dark",
// }

function toastify({ type, message, options }) {
  switch (type) {
    case "success":
      toast.success(message, {
        position: "top-right",
        theme: "dark",
        ...options
      });
      break;
    case "error":
      toast.error(message, options);
      break;
    case "warning":
      toast.warning(message, options);
      break;
    case "info":
      toast.info(message, options);
      break;
    default:
      toast(message, options);
  }
}

export default toastify;