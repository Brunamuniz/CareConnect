import React from 'react';
import "./Hostel.css"
import Header from '../../components/header';
import Carousel from '../../components/Carousel';

const Hostel = () => {
    return (
        <div>
            <Header />
            <div className="pageHostel">
                <div className="hostel">
                    <div className="textHostel">
                        <div className="tituloHostel">
                            <h1 className="Hostel">Locais</h1>
                            <Carousel />
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    );
}

export default Hostel;
