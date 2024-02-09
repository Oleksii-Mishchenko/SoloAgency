import { useRef } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import * as authActions from '../../../../features/authSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputPassword, TextInput } from '../../inputs/fields';
import { LoginData } from '../../../../types/LoginData';
import { useOuterClick } from '../../../../customHooks/useOuterClick';
import { ControlButtonType } from '../../../../types/ControlButtonType';
import { AuthLinkType } from '../../../../types/AuthLinkType';
import { AuthLink, ControlButton, MainButton } from '../../buttons';
import './login.scss';
import { hostName } from '../../../../utils/axiosClient';

export const Login = () => {
  const loginRef = useRef(null);
  const dispatch = useAppDispatch();
  const { isLoggingIn, isGettingUser } = useAppSelector(state => state.auth);
  const onClose = () => dispatch(authActions.closeLoginForm());

  useOuterClick(loginRef, onClose);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginData>({
    mode: 'onTouched',
  });

  const onSubmit: SubmitHandler<LoginData> = async (data: LoginData) => {
    const response = await dispatch(authActions.login(data));
    const { token } = unwrapResult(response);
    await dispatch(authActions.getUserByToken(token));
    onClose();
  };

  return (
    <div className="App__auth-form login" ref={loginRef}>
      <div className="login__content">
        <h3 className="login__title">Увійти</h3>

        <ControlButton
          type="button"
          className="login__close-button"
          title="Закрити"
          buttonType={ControlButtonType.Cross}
          onClick={onClose}
        />

        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login__inputs">
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

            <InputPassword
              label="Пароль"
              placeholder="Пароль"
              error={errors.password?.message}
              register={{
                ...register('password', {
                  required: 'Вкажіть ваш пароль',
                }),
              }}
            />
          </div>

          <a
            href={`${hostName}/accounts/password/reset/`}
            className="login__forgot-password"
            target="_blank"
          >
            Забули пароль?
          </a>

          <MainButton
            className="login__enter-button"
            type="submit"
            text="Увійти"
            isLoading={isLoggingIn || isGettingUser}
          />
        </form>
      </div>

      <div className="login__register">
        <p className="login__register-title">
          Вперше з нами?{' '}
          <AuthLink linkType={AuthLinkType.Register} name="Зареєструватись" />
        </p>
      </div>
    </div>
  );
};
