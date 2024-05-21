import styled from 'styled-components';
import React from 'react';
import Header from '../../components/header';
import Carousel from '../../components/Carousel';
import Global from '../../global/global';

const HostelContainer = styled.div`
color: #F5CB5C;
text-shadow: 0.5px 0.5px 4px #f8f891;
font-size: 100px;
}

&:hover{
color: #333533;
text-shadow: 0.5px 0.5px 4px #e9eedf;
`;


const Hostel = () => {
    return (
        <div>
            <Global />
            <Header />
            <div className="pageHostel">
               <HostelContainer/>
                    <div className="textHostel">
                        <div className="tituloHostel">
                            <h1 className="Hostel">Locais</h1>
                            <Carousel />
                        </div>
                    </div>
                </div>
        </div>  
    );
}

export default Hostel;
