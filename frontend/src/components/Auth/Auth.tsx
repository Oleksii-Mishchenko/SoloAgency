import React from 'react';
import { MainButton } from '../UI/buttons/MainButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as authActions from '../../features/authSlice';
import './auth.scss';

type Props = {
  menu: {
    isMenuOpen: boolean;
    toggleMenu: () => void;
  };
};

export const Auth: React.FC<Props> = ({ menu: { isMenuOpen, toggleMenu } }) => {
  const dispatch = useAppDispatch();
  const { authData } = useAppSelector(state => state.auth);

  const handleMenuClosure = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <div className="auth">
      {authData.token && authData.user ? (
        <MainButton
          className="auth__button"
          text="Вийти"
          onClick={event => {
            event.stopPropagation();
            handleMenuClosure();
            dispatch(authActions.logOut());
          }}
        />
      ) : (
        <>
          <MainButton
            white
            className="auth__button"
            text="Реєстрація"
            onClick={event => {
              event.stopPropagation();
              handleMenuClosure();
              dispatch(authActions.openRegisterForm());
            }}
          />

          <MainButton
            className="auth__button"
            text="Вхід"
            onClick={event => {
              event.stopPropagation();
              handleMenuClosure();
              dispatch(authActions.openLoginForm());
            }}
          />
        </>
      )}
    </div>
  );
};
