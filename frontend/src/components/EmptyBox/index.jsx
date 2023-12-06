import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

function EmptyBox({ title }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 5,
      }}
    >
      <i
        style={{ fontSize: "10rem", opacity: 0.4, lineHeight: "1rem" }}
        className="bi bi-box2"
      ></i>
      <Typography
        sx={{
          fontSize: 15,
          marginTop: 1,
          opacity: 0.8,
        }}
        variant="body1"
      >
        {title}
      </Typography>
    </Box>
  );
}

EmptyBox.propTypes = {
  title: PropTypes.string,
};
export default EmptyBox;
