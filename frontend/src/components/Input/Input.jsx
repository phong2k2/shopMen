import classNames from 'classnames/bind';
import styles from './Input.module.scss'

const cx = classNames.bind(styles)
function Input({
    children,
    type,
    className,
    value,
    onChange,
    ...pasProps
}) {
    const props = {
        onChange,
        ...pasProps
    }
    
    const classes = cx('form-group', {
        [className]: className
    })

    return ( 
        <div  className={classes} >
            <label>{children}</label>
            <input type={type} value={value}  {...props} />
        </div>
     );
}

export default Input;