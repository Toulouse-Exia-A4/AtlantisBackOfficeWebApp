import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import HomeComponent from './HomeComponent.js';
import LoginComponent from './LoginComponent';
import { compose, withState, withHandlers } from 'recompose';
const BaseApp = ({ isAuthenticated, login, loginInfo, updateAuthState }) => (
  <div className="App">
    {isAuthenticated ? <HomeComponent /> : <LoginComponent updateAuth={updateAuthState} />}
  </div>
);

export default compose(
  withState('isAuthenticated', 'updateAuthState', false),
  withState('loginInfo', 'updateLogInfo', ''),
)(BaseApp);