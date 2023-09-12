import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
  to,
  href,
  children,
  outline = false,
  small = false,
  large = false,
  primary = false,
  disabled = false,
  rounded = false,
  className,
  leftIcon,
  onClick,
  ...passProp
}) {
  let Comp = 'button';
  const classes = cx('wrapper', {
    primary,
    outline,
    small,
    large,
    disabled,
    rounded,
    [className]: className,
  });

  const props = {
    onClick,
    ...passProp,
  };

  // 2 cách Remove event listeners when btn is disabled
  if (disabled) {
    delete props.onClick;
  }
  // if (disabled) {
  //   Object.keys(props).forEach((key) => {
  //     if (key.startsWith('on') && typeof props[key] !== 'function') {
  //       delete props[key];
  //     }
  //   });
  // }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }

  return (
    <Comp className={classes} {...props}>
      {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
      <span className={cx('title')}>{children}</span>
    </Comp>
  );
}

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  outline: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  primary: PropTypes.bool,
  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  className: PropTypes.string,
  leftIcon: PropTypes.object,
  onClick: PropTypes.func,
};

export default Button;
