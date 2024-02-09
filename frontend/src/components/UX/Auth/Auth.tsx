import React, { useRef, useState } from 'react';
import { MainButton } from '../../UI/buttons';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import * as authActions from '../../../features/authSlice';
import './auth.scss';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { useOuterClick } from '../../../customHooks/useOuterClick';

type Props = {
  menu: {
    isMenuOpen: boolean;
    toggleMenu: () => void;
  };
};

export const Auth: React.FC<Props> = ({ menu: { isMenuOpen, toggleMenu } }) => {
  const dispatch = useAppDispatch();
  const {
    authData: { token, user },
  } = useAppSelector(state => state.auth);

  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  useOuterClick(accountRef, () => {
    if (isAccountMenuOpen) {
      setIsAccountMenuOpen(false);
    }
  });

  const handleMenuClosure = () => {
    if (isMenuOpen) {
      toggleMenu();
    }

    if (isAccountMenuOpen) {
      setIsAccountMenuOpen(false);
    }
  };

  return (
    <div className="auth">
      {token && user ? (
        <div className="auth__person">
          <div className="auth__account" ref={accountRef}>
            <button
              className={classNames('auth__account-button', {
                'auth__account-button--open': isAccountMenuOpen,
              })}
              onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
            >
              Акаунт
            </button>

            <ul
              className={classNames('auth__menu', {
                'auth__menu--open': isAccountMenuOpen,
              })}
            >
              <li className="auth__menu-item">
                <NavLink
                  to="cabinet"
                  className={({ isActive }) =>
                    classNames('auth__menu-link', {
                      'auth__menu-link--active': isActive,
                    })
                  }
                  onClick={handleMenuClosure}
                >
                  Мої замовлення
                </NavLink>
              </li>

              <li className="auth__menu-item">
                <button
                  type="button"
                  className="auth__menu-link auth__menu-link--button"
                  onClick={() => {
                    handleMenuClosure();
                    dispatch(authActions.logOut());
                  }}
                >
                  Вийти
                </button>
              </li>
            </ul>
          </div>

          <div className="auth__avatar">{user.first_name[0]}</div>
        </div>
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
