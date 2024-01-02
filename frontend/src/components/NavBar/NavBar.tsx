import React from 'react';
import { HeaderNavLink } from '../HeaderNavLink';
import './_nav-bar.scss';

export const NavBar: React.FC = () => {
  return (
    <nav className="nav-bar">
      <ul className="nav-bar__list">
        <li className="nav-bar__item">
          <HeaderNavLink path="/" text="Про нас" />
        </li>

        <li className="nav-bar__item">
          <HeaderNavLink path="/services" text="Послуги" />
        </li>

        <li className="nav-bar__item">
          <HeaderNavLink path="/contacts" text="Контакти" />
        </li>

        <li className="nav-bar__item">
          <HeaderNavLink path="/advices" text="Питання" />
        </li>
      </ul>
    </nav>
  );
};
