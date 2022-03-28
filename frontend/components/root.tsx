import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store/store';
import { HashRouter } from 'react-router-dom';
import App from './app';
import { PersistGate } from 'redux-persist/integration/react';

export default function Root() {
  const { store, persistor } = configureStore();

  return (
    <Provider store={store}>
      <HashRouter>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </HashRouter>
    </Provider>
  )
}