import { useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../../../assets/libs/validation/schema';
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
import { handleProperBlur } from '../../../../helpers/textManipulator';
import { AuthLinkType } from '../../../../types/AuthLinkType';
import { ControlButtonType } from '../../../../types/ControlButtonType';
import { cleanPhoneNumber } from '../../../../helpers/cleanPhoneNumber';
import './register.scss';

type RegisterFormData = RegisterData & { repeatPassword?: string };

export const Register = () => {
  const registerSchema = yup.object({
    first_name: schema.nameRequired,
    last_name: schema.name,
    email: schema.email,
    phone: schema.phone,
    password: schema.createPassword,
    repeatPassword: schema.repeatPassword,
  });

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
  } = useForm<RegisterFormData>({
    mode: 'onTouched',
    defaultValues: {
      first_name: '',
      last_name: null,
      email: '',
      phone: null,
      password: '',
      repeatPassword: '',
    },
    resolver: yupResolver<RegisterFormData>(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async data => {
    data.phone = data.phone ? cleanPhoneNumber(data.phone) : null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { repeatPassword, ...rest } = data;
    const registerData: RegisterData = rest;

    await dispatch(authActions.register(registerData));
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
                  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue(
                      'first_name',
                      handleProperBlur(event.target.value),
                    );
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
                  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
                    setValue('last_name', handleProperBlur(event.target.value));
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
              register={{ ...register('email') }}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field }) => (
                <InputPhoneNumber
                  value={field.value}
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
              register={{ ...register('password') }}
            />

            <InputPassword
              label="Повторіть пароль"
              placeholder="Пароль"
              error={errors.repeatPassword?.message}
              register={{ ...register('repeatPassword') }}
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
