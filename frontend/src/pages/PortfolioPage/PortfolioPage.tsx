import { useAppSelector } from '../../app/hooks';
import { AddProject } from '../../components/AddProject';
import { Portfolio } from '../../components/Portfolio';
import { SearchField } from '../../components/SearchField';
import './portfolio-page.scss';

export const PortfolioPage = () => {
  const { user, token } = useAppSelector(state => state.auth.authData);

  return (
    <div className="portfolio-page">
      <SearchField relPage="portfolio-page" searchBy="title" />

      <Portfolio relPage="portfolio-page" />

      {user?.is_staff && token && <AddProject relPage="portfolio-page" />}
    </div>
  );
};
