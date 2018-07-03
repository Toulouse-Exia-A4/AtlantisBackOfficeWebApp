import React from 'react';
import {compose, withHandlers} from 'recompose';
import _ from 'lodash';
import LinkDeviceButton from "./LinkDeviceButton";

const BaseUserCard = props => (
    <div>
        <div>
            <ul>
                <li>{props.user.firstname}</li>
                <li>{props.user.lastname}</li>
            </ul>
        </div>
        <div>
            <p>
                <button className="btn btn-primary" type="button" data-toggle="collapse"
                        data-target={"#userdevices-"+props.user.userId} aria-expanded="false"
                        aria-controls={"userdevices-"+props.user.userId}>Show User Devices
                </button>
                <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={"#freedevices-"+props.user.userId}
                        aria-expanded="false" aria-controls={"freedevices-"+props.user.userId}>Show Free Devices
                </button>
            </p>
            <div className="row">
                <div className="col">
                    <div className="collapse multi-collapse" id={"userdevices-"+props.user.userId}>
                        <div className="card card-body">
                            <ul className="list-group list-group-flush">
                            {_.map(props.user.devices, device => <li key={device.id} className="list-group-item">Device : {device.name ? device.name : device.id} - Type : {device.deviceType}</li>)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="collapse multi-collapse" id={"freedevices-"+props.user.userId}>
                        <div className="card card-body">
                            <ul className="list-group list-group-flush">
                                {_.map(props.devices, device => <li key={device.id} className="list-group-item"><LinkDeviceButton refresh={props.refresh} user={props.user} device={device}/></li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default compose()(BaseUserCard);