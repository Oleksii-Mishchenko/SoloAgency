import {
  Routes,
  Route,
  HashRouter as Router,
  Navigate,
} from 'react-router-dom';

import { App } from './src/App';
import { HomePage } from './src/pages/HomePage';
import { AboutUsPage } from './src/pages/AboutUsPage';
import { PageNotFound } from './src/pages/PageNotFound';
import { FAQPage } from './src/pages/FAQPage';
import { ServicesPage } from './src/pages/ServicesPage';
import { ContactsPage } from './src/pages/ContactsPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="about-us" element={<AboutUsPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="contacts" element={<ContactsPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </Router>
);
