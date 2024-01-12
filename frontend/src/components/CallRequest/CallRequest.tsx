import { SubmitHandler, useForm } from 'react-hook-form';
import './call-request.scss';
import { CallRequestData } from '../../types/CallRequestData';
import { MainButton } from '../MainButton';
import { Input, Textarea } from '../Input';
import { Errors } from '../Errors';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as callRequestActions from '../../features/callRequestSlice';

export const CallRequest = () => {
  const dispatch = useAppDispatch();
  const {
    callRequest,
    isUploading,
    errors: serverErrors,
  } = useAppSelector(state => state.callRequest);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CallRequestData>({
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<CallRequestData> = async (
    data: CallRequestData,
  ) => {
    await dispatch(callRequestActions.add(data));
    reset();
  };

  const handlePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = event.target.value.slice(0, 13);
    const sanitizedValue = formattedValue.replace(/[^\d+]/g, '');

    event.target.value = sanitizedValue;
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

      {!serverErrors && !callRequest && (
        <form className="call-request__form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="call-request__input"
            type="text"
            placeholder="Ім'я"
            errors={errors}
            register={{
              ...register('name', {
                required: `Вкажіть ваше ім'я`,
                minLength: {
                  value: 3,
                  message: 'Не менше 3 символів',
                },
                maxLength: {
                  value: 63,
                  message: `Занадто довге ім'я`,
                },
              }),
            }}
          />

          <Input
            className="call-request__input"
            type="text"
            placeholder="Місто"
            errors={errors}
            register={{
              ...register('city', {
                required: 'Вкажіть з якого ви міста',
                minLength: {
                  value: 3,
                  message: 'Не менше 3 символів',
                },
                maxLength: {
                  value: 63,
                  message: 'Занадто довга назва',
                },
              }),
            }}
          />

          <Input
            className="call-request__input"
            type="tel"
            placeholder="+380000000000"
            errors={errors}
            register={{
              ...register('phone', {
                required: 'Вкажіть ваш номер телефону',
                value: '+380',
                pattern: {
                  value: /^\+380\d{9}$/,
                  message: 'Формат номеру телефону +380123456789',
                },
                onChange: event => handlePhoneInput(event),
              }),
            }}
          />

          <Textarea
            className="call-request__input"
            rows={5}
            placeholder="Деталі"
            errors={errors}
            register={{
              ...register('description', {
                maxLength: { value: 200, message: 'Не більше 200 символів' },
              }),
            }}
          />

          <MainButton
            isLoading={isUploading}
            disabled={isUploading}
            type="submit"
            text="Замовити"
            className="call-request__button"
          />
        </form>
      )}

      {serverErrors && (
        <>
          <Errors errors={serverErrors} />

          <MainButton
            className="call-request__go-back-button"
            type="reset"
            text="Назад"
            onClick={() => dispatch(callRequestActions.clear())}
          />
        </>
      )}

      {callRequest && (
        <div className="call-request__response">
          <h1 className="call-request__response-title">
            <span className="call-request__response-name">
              {callRequest.name}
            </span>
            , дякуємо Вам за звернення!
          </h1>

          <p className="call-request__response-message">
            Наша команда зв'яжеться з Вами найближчим часом за номером
            <span className="call-request__response-tel">
              {` ${callRequest.phone}`}
            </span>
          </p>

          <MainButton
            className="call-request__go-back-button"
            type="reset"
            text="Назад"
            onClick={() => dispatch(callRequestActions.clear())}
          />
        </div>
      )}
    </div>
  );
};
