import { FC, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import './input.scss';

export const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  type,
  placeholder,
}) => {
  return <input type={type} className="input" placeholder={placeholder} />;
};

export const Textarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  placeholder,
}) => {
  return <textarea className="input" placeholder={placeholder} />;
};
