import React from 'react';
import { HeaderNavLink } from '../HeaderNavLink';
import { navLinks } from '../../assets/navLinks/navLinks';
import './nav-bar.scss';

type Props = {
  menu: {
    isMenuOpen: boolean;
    toggleMenu: () => void;
  };
};

export const NavBar: React.FC<Props> = ({ menu }) => {
  return (
    <nav className="nav-bar">
      <ul className="nav-bar__list">
        {navLinks.map(({ id, path, text }) => (
          <li className="nav-bar__item" key={id}>
            <HeaderNavLink path={path} text={text} menu={menu} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
