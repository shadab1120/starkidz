import React from "react";
import classNames from "classnames";

const Button = ({ color, size,txtColor, className,bgColor,bRadius, outline,width, disabled, ...props }) => {
  const buttonClass = classNames({
    btn: true,
    [`btn-${color}`]: !outline,
    [`btn-outline-${color}`]: outline,
    [`btn-${size}`]: size,
    disabled: disabled,
    [`${className}`]: className,
  });
  return (
    <button className={buttonClass} {...props} style={{backgroundColor:bgColor,border:bRadius,
    color:txtColor,width:width}}>
      {props.children}
    </button>
  );
};
export default Button;
