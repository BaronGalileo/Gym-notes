import type { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./MyButton.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  theme?: "light" | "dark";
};

export const MyButton = ({
  children,
  theme = "light",
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={`${classes.myButton} ${theme === 'dark' ? classes.dark : ''}`}
    >
      {children}
    </button>
  );
};