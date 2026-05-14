import type { ReactNode, SelectHTMLAttributes } from "react";

import cl from "./MySelect.module.css";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  children: ReactNode;
  label?: string;
};

export const MySelect = ({ children, label, ...props }: Props) => {
  return (
    <div className={cl.field}>
      {label && <label className={cl.label}>{label}</label>}

      <select className={cl.mySelect} {...props}>
        {children}
      </select>
    </div>
  );
};

// import type {
//   ReactNode,
//   SelectHTMLAttributes
// } from 'react'
// import cl from './MySelect.module.css'

// type Props =
//   SelectHTMLAttributes<HTMLSelectElement> & {
//     children: ReactNode
//   }

// export const MySelect = ({
//   children,
//   ...props
// }: Props) => {
//   return (
//     <select className={cl.mySelect} {...props}>
//       {children}
//     </select>
//   )
// }
