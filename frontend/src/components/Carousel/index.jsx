import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slide = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f1f1;
  color: #333;
  font-size: 24px;
  height: 400px;
`;

const HostelImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HostelInfo = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 10px;
  border-radius: 5px;
`;

const HostelName = styled.h2`
  margin: 0;
  font-size: 18px;
`;

const HostelLocation = styled.p`
  margin: 0;
  font-size: 14px;
`;

const Arrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 24px;
  z-index: 1;
`;

const LeftArrow = styled(Arrow)`
  left: 10px;
`;

const RightArrow = styled(Arrow)`
  right: 10px;
`;

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <RightArrow
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      &rarr;
    </RightArrow>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <LeftArrow
      className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      &larr;
    </LeftArrow>
  );
};

const Carousel = () => {
  const [hostels, setHostels] = useState([]);

  useEffect(() => {
    const fetchHostels = async () => {
      try {
        const response = await axios.get('https://careconnect-oy9k.onrender.com/api/hostel');
        setHostels(response.data);
      } catch (error) {
        console.error('Error fetching hostels:', error);
      }
    };
    fetchHostels();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <Slider {...settings}>
      {hostels.map((hostel) => (
        <Slide key={hostel._id}>
          <HostelImage src={hostel.imagem} alt={hostel.nome} />
          <HostelInfo>
            <HostelName>{hostel.nome}</HostelName>
            <HostelLocation>{hostel.localizacao}</HostelLocation>
          </HostelInfo>
        </Slide>
      ))}
    </Slider>
  );
};

export default Carousel;
