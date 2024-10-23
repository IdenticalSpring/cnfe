import React from 'react';
import styled from 'styled-components';

// Styled Components
const CardContainer = styled.div`
  max-width: 270px;
  width: 100%;
  height: 250px;
  display: flex; /* Sử dụng Flexbox */
  flex-direction: column;
  background: var(--card-bg, #fff);
  border-radius: 0.5rem;
  overflow: hidden;
  transition: box-shadow 0.5s ease;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const CardHeader = styled.div`
  padding: 1rem;
  flex-grow: 1;
  background-color: ${() => `hsl(${Math.random() * 360}, 70%, 90%)`}; /* Màu ngẫu nhiên */
`;

const Title = styled.h2`
  font-size: .9rem;
  font-weight: 600;
  color: var(--text-secondary-color);
`;

const Subtitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--secondary-foreground, #555);
`;

const CardFooter = styled.div`
  background: white; /* Màu trắng */
  padding: 1rem;
`;

const FooterDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Progress = styled.span`
  color: red;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
`;

const Percentage = styled.span`
  color: var(--muted, #aaa);
`;

const CardSlider = ({ title, subtitle, chapters, items }) => {
    return (
        <CardContainer>
            <CardHeader>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </CardHeader>
            <CardFooter>
                <FooterDetails>
                    <Progress>{chapters} Chapters</Progress>
                    <Progress>{items} Items</Progress>
                </FooterDetails>
                <ButtonContainer>
                    <Percentage>0%</Percentage>
                </ButtonContainer>
            </CardFooter>
        </CardContainer>
    );
};

export default CardSlider;