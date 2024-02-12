import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import * as authActions from '../../../features/authSlice';
import { useOuterClick } from '../../../customHooks/useOuterClick';
import { MainButton } from '../../UI/buttons';
import './auth.scss';

type Props = {
  menu: {
    isMenuOpen: boolean;
    toggleMenu: () => void;
  };
};

export const Auth: React.FC<Props> = ({ menu: { isMenuOpen, toggleMenu } }) => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.user);
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
        <div className="auth__person" title={user.email}>
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
                  to="orders"
                  className={({ isActive }) =>
                    classNames('auth__menu-link', {
                      'auth__menu-link--active': isActive,
                    })
                  }
                  onClick={handleMenuClosure}
                >
                  {user.is_staff ? 'Замовлення' : 'Мої замовлення'}
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

          <div className="auth__avatar" title={user.first_name}>
            {user.first_name[0]}
          </div>
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
