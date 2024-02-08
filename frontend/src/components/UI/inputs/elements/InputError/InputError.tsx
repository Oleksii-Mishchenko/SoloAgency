import './input-error.scss';

type Props = {
  errorMessage: string;
};

export const InputError: React.FC<Props> = ({ errorMessage }) => {
  return (
    <p className="input-error">
      {errorMessage || 'Помилка при валідації даних.'}
    </p>
  );
};
