import { SearchField } from '../../components/SearchField';
import './portfolio-page.scss';

export const PortfolioPage = () => {
  return (
    <div className="portfolio-page">
      <SearchField relPage="portfolio-page" searchBy="title" />
    </div>
  );
};
