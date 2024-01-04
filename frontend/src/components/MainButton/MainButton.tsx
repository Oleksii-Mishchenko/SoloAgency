import { FC, ButtonHTMLAttributes } from 'react';
import './main-button.scss';
import classNames from 'classnames';
import { Loader } from '../Loader';
import { LoaderElement } from '../../types/LoaderElement';

type Props = {
  text: string;
  isLoading?: boolean;
};

type MainButton = FC<Props & ButtonHTMLAttributes<HTMLButtonElement>>;

export const MainButton: MainButton = ({ text, className, isLoading }) => {
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
