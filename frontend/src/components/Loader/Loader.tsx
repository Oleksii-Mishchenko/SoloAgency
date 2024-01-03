import classNames from 'classnames';
import './loader.scss';
import React from 'react';

type Props = {
  element: string;
  className?: string;
};

export const Loader: React.FC<Props> = ({ element, className }) => (
  <div className={classNames(className, 'loader', `loader--${element}`)} />
);
