import { useAppSelector } from '../../app/hooks';
import { AddProject } from '../../components/sections/forms';
import { Portfolio } from '../../components/sections/common';
import { SearchField } from '../../components/UI/inputs/fields';
import './portfolio-page.scss';

export const PortfolioPage = () => {
  const { token } = useAppSelector(state => state.auth);
  const { user } = useAppSelector(state => state.user);

  return (
    <div className="portfolio-page">
      <SearchField relPage="portfolio-page" searchBy="title" />

      <Portfolio relPage="portfolio-page" />

      {user?.is_staff && token && <AddProject relPage="portfolio-page" />}
    </div>
  );
};
