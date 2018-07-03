import React from 'react';
import {compose, withState, withHandlers, lifecycle} from 'recompose';
import axios from 'axios';
import _ from 'lodash';
import UserCard from './UserCard.js';

const BaseHomeComponent = props => (
    <div>
        {props.users.length > 0 ? _.map(props.users, usr => <UserCard key={usr.userId} user={usr} devices={props.devices} refresh={props.refresh} />) : <h4>Loading...</h4>}
    </div>
);

export default compose(
    withState('devices', 'updateDevices', []),
    withState('users', 'updateUsers', []),
    withHandlers({
        refresh: props => event => {
            axios.get('http://localhost:11111/BackOfficeService.svc/users')
                .then(response => {
                    props.updateUsers(response.data);
                })
                .catch(error => {
                    console.error(error);
                    console.error(error.response.data);
                });

            axios.get('http://localhost:11111/BackOfficeService.svc/freedevices')
                .then(response => {
                    props.updateDevices(response.data);
                })
                .catch(error => {
                    console.error(error);
                    console.error(error.response.data);
                });
        }
    }),
    lifecycle({
        componentDidMount() {
            this.props.refresh();
        }
    }),
)(BaseHomeComponent);