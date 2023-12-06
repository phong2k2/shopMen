import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import PropTypes from "prop-types";

function LoadingBackdrop({ openLoading }) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 999 }}
      open={openLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

LoadingBackdrop.propTypes = {
  openLoading: PropTypes.bool,
};

export default LoadingBackdrop;
