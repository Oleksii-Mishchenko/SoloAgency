import { Portfolio } from '../../components/Portfolio';
import { SearchField } from '../../components/SearchField';
import './portfolio-page.scss';

export const PortfolioPage = () => {
  return (
    <div className="portfolio-page">
      <SearchField relPage="portfolio-page" searchBy="title" />

      <Portfolio relPage="portfolio-page" />
    </div>
  );
};
