import type { ButtonHTMLAttributes, ReactNode } from "react";
import classes from "./MyButton.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const MyButton = ({
  children,
  ...props
}: Props) => {
  return (
    <button
      {...props}
      className={classes.myButton}
    >
      {children}
    </button>
  );
};