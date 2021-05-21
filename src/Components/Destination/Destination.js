import React, { useState } from 'react';
import { useParams } from 'react-router';
import GoogleMap from '../GoogleMap/GoogleMap';
import './Destination.css';
import fakeData from '../../FackeData.json';
import RiderDetailsInfo from '../RiderDetailsInfo/RiderDetailsInfo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons'

const Destination = () => {
    const { vehicles } = useParams();
    const riderName = fakeData.find(data => data.name == vehicles);
    const ridersInfo = riderName.riders;

    const [destination, setDestination] = useState({
        from: '',
        to: '',
        isValid: '',
    });

    //handle blur
    const onHandleBlur = (e) => {
        const location = { ...destination };
        location[e.target.name] = e.target.value;
        location.isValid = false;
        setDestination(location);
        console.log("location", location);
    }

    //submit
    const submitHandler = (e) => {
        const ride = { ...destination };
        ride.isValid = true;
        setDestination(ride);
        console.log("dist", ride);

        e.preventDefault()
    }

    return (
        <div>
            <div className="container ">
                <div className="row  ">
                    <div className="col-md-4 text-center mt-5">

                        {destination.isValid &&
                            <div className="location" >
                                <h5> <FontAwesomeIcon icon={faHandPointRight} />From: {destination.from}</h5>
                                <h5> <FontAwesomeIcon icon={faHandPointRight} />To : {destination.to}</h5>
                            </div>
                        }

                        {destination.isValid ?
                            <div>
                                {
                                    ridersInfo.map(riderDetails => <RiderDetailsInfo riderDetails={riderDetails}></RiderDetailsInfo>)
                                }
                            </div> :
                            <form className="pick-form " onSubmit={submitHandler}>
                                <p>Date</p>
                                <input type="date" required />
                                <h4>Pick Form</h4>
                                <input type="text" name="from" onBlur={onHandleBlur} placeholder="Form" required /><br />
                                <h4>Pick To</h4>
                                <input type="text" name="to" onBlur={onHandleBlur} placeholder="To" required /><br /><br />
                                <input className="btn btn-success" type="submit" value="Search" />
                            </form>
                        }

                    </div>
                    <div className="com-md-8">
                        <div style={{ width: '600px' }} className="google-map">
                            <GoogleMap />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Destination;


