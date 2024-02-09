import { Outlet } from 'react-router-dom';
import './main.scss';

export const Main = () => {
  return (
    <div className="main">
      <div className="main__container">
        <Outlet />
      </div>
    </div>
  );
};
