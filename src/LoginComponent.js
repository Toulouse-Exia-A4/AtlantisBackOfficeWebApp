import React from 'react';
import {compose, withState, withHandlers} from 'recompose';
import axios from "axios/index";
import _ from "lodash";

const BaseLoginComponent = props => (
    <div>
        <label htmlFor="username">Username</label>
        <input id="username" onChange={props.onUsernameChange} value={props.username} type="text"/>
        <label htmlFor="password">Password</label>
        <input id="password" onChange={props.onPasswordChange} value={props.password} type="password"/>
        <button onClick={props.onLogin}>Login</button>
        <p>{props.loginInfo}</p>
        {props.isLoading ? <h3>Loading...</h3> : null}
    </div>
)

export default compose(
    withState('username', 'updateUsername', ""),
    withState('password', 'updatePassword', ""),
    withState('loginInfo', 'updateLoginInfo', ''),
    withHandlers({
        onLogin: props => event => {
            event.preventDefault();
            axios.post('http://localhost:11111/BackOfficeService.svc/login', {username: props.username, password: props.password})
                .then((response) => {
                    if(!_.isNil(response.data)) {
                        if(response.data.LoginResult) {
                            props.updateAuth(true);
                        } else {
                            props.updateLoginInfo('Erreur : Incorrect password.');
                            props.updateUsername('');
                            props.updatePassword('');
                        }
                    }
                })
                .catch((error) => {
                    props.updateUsername('');
                    props.updatePassword('');
                    props.updateLoginInfo('Erreur : ' + error.response.data);
                });
        },
        onPasswordChange: props => event => {
            event.preventDefault();
            props.updatePassword(event.target.value);
        },
        onUsernameChange: props => event => {
            event.preventDefault();
            props.updateUsername(event.target.value);
        }
    }),
)(BaseLoginComponent);