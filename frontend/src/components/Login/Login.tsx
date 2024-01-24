import { SubmitHandler, useForm } from 'react-hook-form';
import { Input, InputPassword } from '../Input';
import { LoginData } from '../../types/LoginData';
import { MainButton } from '../MainButton';
import { useRef } from 'react';
import { useOuterClick } from '../../customHooks/useOuterClick';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as authActions from '../../features/authSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import './login.scss';

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

        <button
          type="button"
          className="login__close-button"
          onClick={onClose}
        />

        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="login__inputs">
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

            <InputPassword
              label="Пароль"
              placeholder="Пароль"
              errors={errors}
              register={{
                ...register('password', {
                  required: 'Вкажіть ваш пароль',
                }),
              }}
            />
          </div>

          <p className="login__forgot-password">Забули пароль?</p>

          <MainButton
            className="login__enter-button"
            type="submit"
            text="Увійти"
            isLoading={isLoggingIn || isGettingUser}
          />
        </form>
      </div>

      <div className="login__register">
        <p className="login__register-title">Вперше з нами?</p>

        <p className="login__register-link">Зареєструватись</p>
      </div>
    </div>
  );
};
