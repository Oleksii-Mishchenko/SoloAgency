import {
  Routes,
  Route,
  HashRouter as Router,
  Navigate,
} from 'react-router-dom';

import { App } from './src/App';
import { HomePage } from './src/pages/HomePage';
import { PortfolioPage } from './src/pages/PortfolioPage';
import { PageNotFound } from './src/pages/PageNotFound';
import { AdvicesPage } from './src/pages/AdvicesPage';
import { ServicesPage } from './src/pages/ServicesPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="advices" element={<AdvicesPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
