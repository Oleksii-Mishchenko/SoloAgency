import { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { LoaderElement } from '../../../../types/LoaderElement';
import { Loader } from '../../../UX';
import './main-button.scss';

type Props = {
  text: string;
  isLoading?: boolean;
  white?: boolean;
};

type MainButton = React.FC<Props & ButtonHTMLAttributes<HTMLButtonElement>>;

export const MainButton: MainButton = ({
  text,
  className,
  isLoading,
  white,
  ...rest
}) => {
  return (
    <button
      className={classNames(className, 'main-button', {
        'main-button--white': white,
      })}
      disabled={isLoading}
      {...rest}
    >
      {text}
      {isLoading && (
        <div className="main-button__loader-container">
          <Loader element={LoaderElement.Button} />
        </div>
      )}
    </button>
  );
};
