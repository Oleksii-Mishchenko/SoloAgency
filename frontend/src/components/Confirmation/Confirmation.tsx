import './confirmation.scss';

type Props = {
  className: string;
  message: string;
};

export const Confirmation: React.FC<Props> = ({ className }) => {
  return <div className={`${className} confirmation`}>Confirmation</div>;
};
