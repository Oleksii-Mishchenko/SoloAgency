import { Outlet } from 'react-router-dom';
import './App.scss';
import { Link } from 'react-router-dom';

export const App = () => {
  return (
    <div className="App">
      <h1 className="App__title">Solo Agency</h1>
      <Link to={'home'}>Home</Link>
      <Link to={'about-us'}>About us</Link>
      <Link to={'faq'}>FAQ</Link>
      <Link to={'contacts'}>Contacts</Link>
      <Link to={'services'}>Services</Link>
      <Link to={'anypage'}>Page not found</Link>
      <Outlet />
    </div>
  );
};
