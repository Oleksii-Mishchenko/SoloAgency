import React from 'react';
import './main-button.scss';
import classNames from 'classnames';

type Props = {
  text: string;
  className?: string;
};

export const MainButton: React.FC<Props> = ({ text, className }) => {
  return (
    <button className={classNames('main-button', className)}>{text}</button>
  );
};
