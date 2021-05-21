import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './RidersInfo.css';

const RidersInfo = (props) => {

    const { name, img, id } = props.data;

    let history = useHistory();
    function handleClick() {
        history.push(`/destination/${name}`);
    }

    return (
        <div className="col-md-3 mt-5 vehicle-item ">
            <Card onClick={handleClick} className="vehicles">
                <Card.Img variant="top" src={img} />
                <Card.Body className="text-center">
                    <Card.Title>{name}</Card.Title>
                </Card.Body>
            </Card>



        </div>
    );
};

export default RidersInfo;