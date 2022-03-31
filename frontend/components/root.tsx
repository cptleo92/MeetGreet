import React from 'react';
import { Provider } from 'react-redux';
import { configureStore, RootState } from '../store/store';
import { HashRouter } from 'react-router-dom';
import App from './app';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor } from 'redux-persist';


// testing
import { login } from '../actions/session_actions';


export default function Root({ store, persistor }: {store: any, persistor: Persistor}) {
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