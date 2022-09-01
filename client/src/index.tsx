import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import store from './store/store';
import Context from './context/context';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Context.Provider value={store}>
    <App />
  </Context.Provider>,
);
