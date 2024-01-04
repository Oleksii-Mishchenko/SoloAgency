import { FC, InputHTMLAttributes } from 'react';
import './input.scss';

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  type,
  className,
  placeholder,
}) => {
  return <input type={type} className={className} placeholder={placeholder} />;
};
