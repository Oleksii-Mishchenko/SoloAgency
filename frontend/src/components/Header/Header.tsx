import { Link } from 'react-router-dom';
import './_header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link to={'home'}>Home</Link>
        <Link to={'about-us'}>About us</Link>
        <Link to={'faq'}>FAQ</Link>
        <Link to={'contacts'}>Contacts</Link>
        <Link to={'services'}>Services</Link>
        <Link to={'anypage'}>Page not found</Link>
      </div>
    </header>
  );
};
