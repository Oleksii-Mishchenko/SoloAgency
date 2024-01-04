import { useForm } from 'react-hook-form';
import './call-request.scss';
import { CallRequestData } from '../../types/CallRequestData';
import { MainButton } from '../MainButton';
import { Input } from '../Input';

export const CallRequest = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data: CallRequestData) => {
    console.log(data);
  };

  return (
    <div className="home-page__call-request call-request">
      <div className="call-request__info">
        <h2 className="call-request__title">Замовити дзвінок?</h2>

        <p className="call-request__description">
          Заповнюй свої дані, а наша команда сконтактує вас найближчим часом для
          того, аби відповісти на всі ваші запитання
        </p>
      </div>

      <form className="call-request__form" onSubmit={handleSubmit(onSubmit)}>
        <Input type="text" placeholder="Ім'я" />
        <Input type="text" placeholder="Місто" />
        <Input type="tel" placeholder="+380 00 000 00 00" />
        <MainButton text="Замовити" className="call-request__button" />
      </form>
    </div>
  );
};
