import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store/store';
import { HashRouter } from 'react-router-dom';
import App from './app';
import { PersistGate } from 'redux-persist/integration/react';

// testing
import { login } from '../actions/session_actions';

export default function Root({ store, persistor }) {
  // testing
  // window.demo = {email: 'demo@fake.com', password: 'password'}
  // window.dispatch = store.dispatch;
  // window.login = login;


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