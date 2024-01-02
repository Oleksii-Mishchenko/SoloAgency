import { Logo } from '../Logo';
import { NavBar } from '../NavBar';
import './_header.scss';

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Logo />

        <NavBar />

        <div>Auth</div>
      </div>
    </header>
  );
};
