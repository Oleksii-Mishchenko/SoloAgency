import classNames from 'classnames';
import './label.scss';

type Props = {
  label: string;
  isRequired?: boolean;
};

export const Label: React.FC<Props> = ({ label, isRequired }) => {
  return (
    <label
      htmlFor={label}
      className={classNames('label', { 'label--is-required': isRequired })}
    >
      {label}
    </label>
  );
};
