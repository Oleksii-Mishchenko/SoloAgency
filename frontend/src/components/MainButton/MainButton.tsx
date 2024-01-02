import React from 'react';
import './main-button.scss';

type Props = {
  text: string;
};

export const MainButton: React.FC<Props> = ({ text }) => {
  return <button className="main-button">{text}</button>;
};
