import React from 'react';
import { HeaderNavLink } from '../../UI/buttons';
import { navLinks } from '../../../assets/navLinks/navLinks';
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
        {navLinks.map(link => (
          <li className="nav-bar__item" key={link.id}>
            <HeaderNavLink link={link} menu={menu} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
