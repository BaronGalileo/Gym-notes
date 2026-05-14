import type { ChangeEvent, InputHTMLAttributes } from "react";
import cl from "./MyInput.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export const MyInput = ({ label, ...props }: Props) => {
  const isNumber = props.type === "number";

  const handleStep = (delta: number) => {
    if (!props.onChange) return;

    const current = Number(props.value) || 0;

    props.onChange({
      target: {
        value: String(Math.max(0, current + delta)),
      },
    } as ChangeEvent<HTMLInputElement>);
  };
  return (
    <div className={cl.field}>
      {label && <label className={cl.label}>{label}</label>}

      <div className={cl.inputWrapper}>
        {isNumber && (
          <button
            type="button"
            className={cl.stepBtn}
            onClick={() => handleStep(-1)}
          >
            −
          </button>
        )}

        <input className={cl.myInput} {...props} />

        {isNumber && (
          <button
            type="button"
            className={cl.stepBtn}
            onClick={() => handleStep(1)}
          >
            +
          </button>
        )}
      </div>
    </div>
    // <div className={cl.field}>
    //   {label && <label className={cl.label}>{label}</label>}

    //   <input className={cl.myInput} {...props} />
    // </div>
  );
};
