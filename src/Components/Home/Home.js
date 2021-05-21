import React, { useEffect } from 'react';
import FakeData from '../../FackeData.json'
import RidersInfo from '../RidersInfo/RidersInfo';
import './Home.css';



const Home = () => {

    return (
        <div className="home-riders">
            <div className="container">
                <div className="row">
                    {
                        FakeData.map((data, id) => <RidersInfo key={id} data={data}></RidersInfo>)
                    }
                </div>
            </div>

        </div>
    );
};

export default Home;