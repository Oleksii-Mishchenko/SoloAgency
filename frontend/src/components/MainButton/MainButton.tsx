import React from 'react';
import './main-button.scss';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { LoaderElement } from '../../types/LoaderElement';

type Props = {
  text: string;
  className?: string;
  isLoading?: boolean;
};

export const MainButton: React.FC<Props> = ({ text, className, isLoading }) => {
  return (
    <button className={classNames('main-button', className)}>
      {text}
      {isLoading && (
        <div className="main-button__loader-container">
          <Loader element={LoaderElement.Button} />
        </div>
      )}
    </button>
  );
};
