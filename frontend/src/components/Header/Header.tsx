import { useState } from 'react';
import { Auth } from '../Auth';
import { Logo } from '../Logo';
import { NavBar } from '../NavBar';
import './header.scss';
import classNames from 'classnames';
import { ControlButton } from '../ControlButton';
import { ControlButtonType } from '../../types/ControlButtonType';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    const rootElement = document.body;
    rootElement.style.overflow = isMenuOpen ? 'auto' : 'hidden';
  };

  return (
    <header className="header">
      <div className="header__container">
        <Logo />

        <div
          className={classNames('header__menu', {
            'header__menu--open': isMenuOpen,
          })}
        >
          <NavBar menu={{ isMenuOpen, toggleMenu }} />

          <Auth menu={{ isMenuOpen, toggleMenu }} />

          <ControlButton
            type="button"
            title="Закрити меню"
            className="header__menu-closer"
            buttonType={ControlButtonType.Cross}
            onClick={toggleMenu}
          />
        </div>

        <ControlButton
          type="button"
          title="Відкрити меню"
          className="header__burger"
          buttonType={ControlButtonType.Burger}
          onClick={toggleMenu}
        />
      </div>
    </header>
  );
};
