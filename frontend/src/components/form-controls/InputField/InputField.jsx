import { TextField } from "@mui/material";
import PropTypes from 'prop-types';

function InputField({name, label, register, errors, children, ...props}) {
    const hasError = errors[name]
    return ( 
        <TextField
            variant="outlined"
            fullWidth
            name={name}
            label={label}
            {...register(name)}
            error={!!hasError}
            helperText={errors[name]?.message}
            {...props}
            style={{ fontSize: '50px' }}
            size={'string'}
        >
            {children}
        </TextField>
     );
}

InputField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    register: PropTypes.func,
    errors: PropTypes.object,
    children: PropTypes.node
};


export default InputField;