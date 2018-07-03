import React from 'react';
import App from './App.js';
import LoginPage from './LoginPage.js';

export const authState = {
    loggedin: {
        component: <App/>
    },
    loggedout: {
        component: <LoginPage/>
    }
}

export const AuthContext = React.createContext(authState.loggedout);