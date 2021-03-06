import React from 'react';
import ReactDOM from 'react-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';

import Router from 'routes';
import store from './redux/store';
import './index.css';
import './print.css';
import { Provider } from 'react-redux';

import './utils/dayjs';

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById('root')
);
