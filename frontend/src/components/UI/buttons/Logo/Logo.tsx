import { Link } from 'react-router-dom';
import logoImage from '../../../../assets/img/Logo.svg';
import './logo.scss';

export const Logo: React.FC = () => {
  return (
    <Link to={'/home'} className="logo">
      <img src={logoImage} alt="Logo" className="logo__image" />
    </Link>
  );
};
