import ReactDOM from 'react-dom/client';
import { Root } from '../Root';
import { Provider } from 'react-redux';
import { persistor, store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import React from 'react';
import './styles/_main.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <PersistGate loading={null} persistor={persistor}>
        <Root />
      </PersistGate>
    </React.StrictMode>
  </Provider>,
);
