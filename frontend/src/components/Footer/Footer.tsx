import { Link } from 'react-router-dom';
import { navLinks } from '../../assets/navLinks/navLinks';
import { Logo } from '../Logo';
import { SocialMedia } from '../SocialMedia';
import './footer.scss';

export const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <Logo />

        <div className="footer__content">
          <nav className="footer__nav-bar">
            <ul className="footer__nav-list">
              {navLinks.map(({ id, path, text }) => (
                <li className="footer__nav-item" key={id}>
                  <Link to={path} className="footer__nav-link">
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SocialMedia />
        </div>
      </div>
    </div>
  );
};
