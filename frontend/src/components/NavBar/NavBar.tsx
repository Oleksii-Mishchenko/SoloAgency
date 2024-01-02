import React from 'react';
import { HeaderNavLink } from '../HeaderNavLink';
import './_nav-bar.scss';
import { navLinks } from '../../assets/navLinks/navLinks';

export const NavBar: React.FC = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-bar__list">
        {navLinks.map(({ id, path, text }) => (
          <li className="nav-bar__item" key={id}>
            <HeaderNavLink path={path} text={text} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
