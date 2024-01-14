import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './header-nav-link.scss';

type Props = {
  path: string;
  text: string;
  menu: {
    isMenuOpen: boolean;
    toggleMenu: () => void;
  };
};

export const HeaderNavLink: React.FC<Props> = ({
  path,
  text,
  menu: { isMenuOpen, toggleMenu },
}) => {
  const handleMenuClosure = () => {
    if (isMenuOpen) {
      toggleMenu();
    }
  };

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        classNames('header-nav-link', { 'header-nav-link--active': isActive })
      }
      onClick={handleMenuClosure}
    >
      {text}
    </NavLink>
  );
};
