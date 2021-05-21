import React from 'react';
import './RiderInfoDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends } from '@fortawesome/free-solid-svg-icons';

const RiderDetailsInfo = (props) => {

    const { shortname, provider, amount, img } = props.riderDetails
    
    return (
        <div>
            <div className="rideDetails">
                <div className="img">
                    <img src={img} alt="" />
                </div>
                <div className="details">
                    <h4>{shortname}</h4>
                    <h5>  <FontAwesomeIcon icon={faUserFriends} />  {provider}</h5>
                    <h4> ${amount}</h4>
                </div>
            </div>


        </div>
    );
};

export default RiderDetailsInfo;
