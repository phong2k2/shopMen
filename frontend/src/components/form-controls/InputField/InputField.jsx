import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import "./InputField.scss";

function InputField(props) {
  const {
    name,
    sx,
    validate,
    type = "text",
    errors,
    select,
    onChange,
    ...rest
  } = props;
  const hasError = errors[name];
  return (
    <TextField
      variant="outlined"
      fullWidth
      type={type}
      sx={{ ...sx }}
      {...validate}
      select={select}
      error={!!hasError}
      helperText={errors[name]?.message}
      onChange={onChange}
      {...rest}
    />
  );
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  sx: PropTypes.object,
  validate: PropTypes.object,
  type: PropTypes.string,
  errors: PropTypes.object,
  helperText: PropTypes.string,
  select: PropTypes.bool,
  onChange: PropTypes.func,
};

export default InputField;
