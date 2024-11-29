function Button({
  children,
  size,
  p,
  px,
  py,
  color,
  bgColor,
  boradius,
  type,
  onClick,
  disabled,
}) {
  const btnStyle = {
    fontSize: size,
    color: color,
    cursor: disabled && "disabled",
    backgroundColor: bgColor,
    borderRadius: boradius,
    padding: p ? p : `${px} ${py}`,
  };

  return (
    <button
      style={btnStyle}
      className={`btn`}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: "2rem",
  p: "0.5rem 1rem",
  px: "0.5rem",
  py: "1rem",
  color: "#fff",
  bgColor: "#ff6b35",
  boradius: "5px",
  type: "button",
  onClick: () => {},
  disabled: false,
};

export default Button;
