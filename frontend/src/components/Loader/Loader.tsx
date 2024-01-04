import classNames from 'classnames';
import './loader.scss';
import React from 'react';
import { LoaderElement } from '../../types/LoaderElement';

type Props = {
  element: LoaderElement;
  className?: string;
};

export const Loader: React.FC<Props> = ({ element, className }) => (
  <div className={classNames(className, 'loader', `loader--${element}`)} />
);
