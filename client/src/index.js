import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';

import Dashboard from 'views/Dashboard.js';
import Login from 'views/Login';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/login" component={Login} />
      <Redirect from="/" to="/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
