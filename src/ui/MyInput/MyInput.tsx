import type {
    InputHTMLAttributes
} from 'react';
import cl from './MyInput.module.css';

type Props =
  InputHTMLAttributes<HTMLInputElement>

export const MyInput = (
  props: Props
) => {
  return <input className={cl.myInput} {...props} />
}