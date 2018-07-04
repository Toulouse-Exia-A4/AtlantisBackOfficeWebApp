import React from 'react';
import {compose, withState, withHandlers} from 'recompose';
import axios from "axios/index";
import _ from "lodash";

const BaseLoginComponent = props => (
    <div className="container">
        <div className="row">
            <div className="col-sm">
            </div>
            <div className="col-sm">
                <div className="div-center">
                    <div className="content">
                        <h3>Atlantis BackOffice Login</h3>
                        <hr/>
                        <div>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" className="form-control" id="username" onChange={props.onUsernameChange} value={props.username} placeholder="Username" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password"
                                       placeholder="Password" onChange={props.onPasswordChange} value={props.password} />
                            </div>
                            <button type="button" onClick={props.onLogin} className="btn btn-dark" disabled={props.isLoading}>Login {props.isLoading ?
                                <i className="fa fa-refresh fa-spin"></i> : null}</button>
                            <hr/>
                            <div>{props.loginInfo ? <div className="alert alert-danger" role="alert">{props.loginInfo}</div> : null}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm">
            </div>
        </div>
    </div>

)

export default compose(
    withState('username', 'updateUsername', ""),
    withState('password', 'updatePassword', ""),
    withState('loginInfo', 'updateLoginInfo', ''),
    withState('isLoading', 'updateIsLoading', false),
    withHandlers({
        onLogin: props => event => {
            event.preventDefault();
            props.updateIsLoading(true);
            axios.post('http://localhost:30040/BackOfficeService.svc/login', {username: props.username, password: props.password})
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
                    props.updateIsLoading(false);
                })
                .catch((error) => {
                    props.updateUsername('');
                    props.updatePassword('');
                    props.updateLoginInfo('Erreur : ' + error.response.data);
                    props.updateIsLoading(false);
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