import { useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as authActions from '../../../../features/authSlice';
import {
  InputPassword,
  InputPhoneNumber,
  TextInput,
} from '../../inputs/fields';
import { AuthLink, ControlButton, MainButton } from '../../buttons';
import { useOuterClick } from '../../../../customHooks/useOuterClick';
import { RegisterData } from '../../../../types/RegisterData';
import { handleNameBlur } from '../../../../helpers/textManipulator';
import { AuthLinkType } from '../../../../types/AuthLinkType';
import { ControlButtonType } from '../../../../types/ControlButtonType';
import { cleanPhoneNumber } from '../../../../helpers/cleanPhoneNumber';
import './register.scss';

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
    control,
    getValues,
  } = useForm<RegisterFormData>({
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<RegisterData> = async (data: RegisterData) => {
    if (data.phone) {
      data.phone = cleanPhoneNumber(data.phone);
    }

    await dispatch(authActions.register(data));
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
            <TextInput
              type="text"
              label="Введіть ваше ім’я"
              placeholder="Ім'я"
              isRequired
              error={errors.first_name?.message}
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

            <TextInput
              type="text"
              label="Ваше прізвище"
              placeholder="Прізвище"
              error={errors.last_name?.message}
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
                    setValue('last_name', handleNameBlur(event.target.value));
                    trigger('last_name');
                  },
                }),
              }}
            />

            <TextInput
              label="Електрона пошта"
              type="email"
              isRequired
              placeholder="Email"
              error={errors.email?.message}
              register={{
                ...register('email', {
                  required: 'Вкажіть вашу електронну пошту',
                }),
              }}
            />

            <Controller
              control={control}
              name="phone"
              rules={{
                pattern: {
                  value: /^\+38 \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
                  message: 'Введіть правильний номер телефону',
                },
              }}
              render={({ field }) => (
                <InputPhoneNumber
                  value={field.value || ''}
                  onChange={(value: string) => field.onChange(value)}
                  onBlur={field.onBlur}
                  error={errors.phone?.message}
                  label="Ваш номер телефону"
                />
              )}
            />

            <InputPassword
              label="Пароль"
              placeholder="Пароль"
              error={errors.password?.message}
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
              error={errors.repeatPassword?.message}
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
