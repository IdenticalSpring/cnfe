import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardSlider from './CardSlider';

// Styled Components
const SliderWrapper = styled.div`
  width: 100%;
  margin: 0;
  overflow: hidden;
`;

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const SlickExplore = ({ slidesData }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4,
    touchThreshold: 10,
    touchMove: true,
    swipe: true,
  };

  return (
    <SliderWrapper>
      <Slider {...settings}>
        {slidesData && slidesData.length > 0 ? (
          slidesData.map((slide) => (
            <CardWrapper key={slide.id}>
              <CardSlider
                title={slide.title}
                subtitle={slide.subtitle}
                chapters={slide.chapters}
                items={slide.items}
              />
            </CardWrapper>
          ))
        ) : (
          <p>No slides available.</p>
        )}
      </Slider>
    </SliderWrapper>
  );
};


export default SlickExplore;