import { useState } from 'react';
import { Auth } from '../Auth';
import { Logo } from '../Logo';
import { NavBar } from '../NavBar';
import './header.scss';
import classNames from 'classnames';

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

          <Auth />

          <button
            type="button"
            className="header__menu-closer"
            onClick={toggleMenu}
          />
        </div>

        <button className="header__burger" onClick={toggleMenu} />
      </div>
    </header>
  );
};
