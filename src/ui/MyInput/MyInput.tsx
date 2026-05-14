import type { InputHTMLAttributes } from "react";
import cl from "./MyInput.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const MyInput = ({ label, ...props }: Props) => {
  return (
    <div className={cl.field}>
      {label && <label className={cl.label}>{label}</label>}

      <input className={cl.myInput} {...props} />
    </div>
  );
};