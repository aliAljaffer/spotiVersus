import { Link } from "react-router-dom";
import { PropsWithChildren } from "react";
type ButtonProps = {
  to?: string;
  className?: string;
  onClick?: () => void;
};
export default function Button({
  to = "",
  className = "",
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) {
  const baseStyles = "rounded-sm px-3 py-2.5";
  if (to !== "")
    return (
      <Link to={to} onClick={onClick} className={`${className} ${baseStyles}`}>
        {children}
      </Link>
    );
  return (
    <button className={`${className} ${baseStyles}`} onClick={onClick}>
      {children}
    </button>
  );
}
