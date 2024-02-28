import classNames from 'classnames';
import { LoaderElement } from '../../../types/LoaderElement';
import './loader.scss';

type Props = {
  element: LoaderElement;
  className?: string;
};

export const Loader: React.FC<Props> = ({ element, className }) => (
  <div className={classNames(className, 'loader', `loader--${element}`)} />
);
