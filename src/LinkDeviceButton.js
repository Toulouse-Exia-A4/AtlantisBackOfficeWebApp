import React from 'react';
import {compose, withHandlers} from "recompose";
import axios from "axios";

const BaseLinkDeviceButton = props => <button type="button" className="btn btn-success" onClick={props.linkDevice}>Device: {props.device.id} - Type : {props.device.deviceType}</button>;

export default compose(
    withHandlers({
        linkDevice: props => event => {
            event.preventDefault();
            const deviceId = props.device.id;
            const userId = props.user.userId;

            axios.post(
                'http://localhost:30040/BackOfficeService.svc/linkdevice',
                {
                    userId: userId,
                    deviceId: deviceId
                })
                .then(response => {
                    console.log(response);
                    props.refresh();
                })
                .catch(error => {
                    console.error(error);
                    console.error(error.response);
                    props.refresh();
                });
        }
    })
)(BaseLinkDeviceButton);