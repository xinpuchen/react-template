import React from 'react';
import { hot } from 'react-hot-loader/root';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter as Router } from 'react-router-dom';
import routes from 'routes';

import { Hello } from 'components';
import logo from 'assets/logo.svg';
import './App.scss';

const App = () => (
  <div styleName="App">
    <div styleName="App-header">
      <img src={logo} styleName="App-logo" alt="logo" />
    </div>
    <Hello msg="React-tamplate" />
    <Router>{renderRoutes(routes)}</Router>
  </div>
);

export default hot(App);
