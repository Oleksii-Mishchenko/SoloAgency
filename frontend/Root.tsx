import {
  Routes,
  Route,
  HashRouter as Router,
  Navigate,
} from 'react-router-dom';

import { App } from './src/App';
import { HomePage } from './src/pages';
import { PortfolioPage } from './src/pages';
import { PageNotFound } from './src/pages';
import { AdvicesPage } from './src/pages';
import { ServicesPage } from './src/pages';
import { OrdersPage } from './src/pages';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="portfolio" element={<PortfolioPage />} />
        <Route path="advices" element={<AdvicesPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
