import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';
import './header-nav-link.scss';

type Props = {
  path: string;
  text: string;
};

export const HeaderNavLink: React.FC<Props> = ({ path, text }) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        classNames('header-nav-link', { 'header-nav-link--active': isActive })
      }
    >
      {text}
    </NavLink>
  );
};

{
  /* <Link to={'home'}>Home</Link>
<Link to={'about-us'}>About us</Link>
<Link to={'faq'}>FAQ</Link>
<Link to={'contacts'}>Contacts</Link>
<Link to={'services'}>Services</Link>
<Link to={'anypage'}>Page not found</Link> */
}
