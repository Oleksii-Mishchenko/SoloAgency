import { SubmitHandler, useForm } from 'react-hook-form';
import { Input, InputPassword } from '../Input';
import { MainButton } from '../MainButton';
import { useRef } from 'react';
import { useOuterClick } from '../../customHooks/useOuterClick';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as authActions from '../../features/authSlice';
import { RegisterData } from '../../types/RegisterData';
import './register.scss';
import { handleNameBlur } from '../../helpers/textManipulator';
import { AuthLink } from '../AuthLink';
import { AuthLinkType } from '../../types/AuthLinkType';
import { ControlButton } from '../ControlButton';
import { ControlButtonType } from '../../types/ControlButtonType';

export const Register = () => {
  type RegisterFormData = RegisterData & { repeatPassword: string };

  const registerRef = useRef(null);
  const dispatch = useAppDispatch();
  const { isRegistering } = useAppSelector(state => state.auth);
  const onClose = () => dispatch(authActions.closeRegisterForm());

  useOuterClick(registerRef, onClose);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    trigger,
    getValues,
  } = useForm<RegisterFormData>({
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<RegisterData> = async (data: RegisterData) => {
    await dispatch(authActions.register(data));
  };

  const handlePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = event.target.value.slice(0, 13);
    const sanitizedValue = formattedValue.replace(/[^\d+]/g, '');

    event.target.value = sanitizedValue;
  };

  return (
    <div className="App__auth-form register" ref={registerRef}>
      <div className="register__content">
        <h3 className="register__title">Реєстрація</h3>

        <ControlButton
          type="button"
          title="Закрити"
          className="register__close-button"
          buttonType={ControlButtonType.Cross}
          onClick={onClose}
        />

        <form className="register__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="register__inputs">
            <Input
              type="text"
              label="Ваше ім’я"
              placeholder="Ім'я"
              errors={errors}
              register={{
                ...register('first_name', {
                  required: `Вкажіть ваше ім'я`,
                  minLength: {
                    value: 2,
                    message: 'Не менше 2 символів',
                  },
                  maxLength: {
                    value: 30,
                    message: `Не більше 30 символів`,
                  },
                  pattern: {
                    value: /^[A-Za-zА-Яа-я ]+$/,
                    message: 'Тільки українські та латинські літери',
                  },
                  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue('first_name', handleNameBlur(event.target.value));
                    trigger('first_name');
                  },
                }),
              }}
            />

            <Input
              type="text"
              label="Ваше прізвище"
              placeholder="Прізвище"
              errors={errors}
              register={{
                ...register('last_name', {
                  minLength: {
                    value: 2,
                    message: 'Не менше 2 символів',
                  },
                  maxLength: {
                    value: 30,
                    message: `Не більше 30 символів`,
                  },
                  pattern: {
                    value: /^[A-Za-zА-Яа-я ]+$/,
                    message: 'Тільки українські та латинські літери',
                  },
                  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue('first_name', handleNameBlur(event.target.value));
                    trigger('first_name');
                  },
                }),
              }}
            />

            <Input
              label="Електрона пошта"
              type="email"
              placeholder="Email"
              errors={errors}
              register={{
                ...register('email', {
                  required: 'Вкажіть вашу електронну пошту',
                }),
              }}
            />

            <Input
              type="tel"
              label="Ваш номер телефону"
              placeholder="+380 XX XXX XX XX"
              errors={errors}
              register={{
                ...register('phone', {
                  pattern: {
                    value: /^\+380\d{9}$/,
                    message: 'Формат номеру телефону +380123456789',
                  },
                  onChange: event => handlePhoneInput(event),
                }),
              }}
            />

            <InputPassword
              label="Пароль"
              placeholder="Пароль"
              errors={errors}
              register={{
                ...register('password', {
                  required: 'Вкажіть ваш пароль',
                  minLength: {
                    value: 5,
                    message: 'Не менше 5 символів',
                  },
                }),
              }}
            />

            <InputPassword
              label="Повторіть пароль"
              placeholder="Пароль"
              errors={errors}
              register={{
                ...register('repeatPassword', {
                  required: 'Повторіть пароль',
                  validate: value =>
                    value === getValues('password') || 'Паролі не співпадають',
                }),
              }}
            />
          </div>

          <MainButton
            className="register__enter-button"
            type="submit"
            text="Зареєструватись"
            isLoading={isRegistering}
          />
        </form>
      </div>

      <div className="register__login">
        <p className="register__login-title">
          Маєте акаунт? <AuthLink linkType={AuthLinkType.Login} name="Увійти" />
        </p>
      </div>
    </div>
  );
};
