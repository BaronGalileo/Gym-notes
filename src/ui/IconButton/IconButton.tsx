import type { ButtonHTMLAttributes } from "react";
import cl from "./IconButton.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: string;
};

export const IconButton = ({
  icon = "×",
  className = "",
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={`${cl.iconButton} ${className}`}
    >
      {icon}
    </button>
  );
};