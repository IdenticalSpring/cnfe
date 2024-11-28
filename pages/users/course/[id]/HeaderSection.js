import React from "react";
import styled from "styled-components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ShareAltOutlined from "@mui/icons-material/Share";
import { BookOutlined, PlayCircleOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

const HeaderSection = ({
  title,
  imageUrl,
  chaptersCount,
  lessonsCount,
  price,
  showPurchaseModal,
  handleShare,
  hasPurchased,
}) => {
  const router = useRouter();

  return (
    <StyledHeaderSection $bgImage={imageUrl}>
      <HeaderContainer>
        <BackButton onClick={() => router.push("/users/course")}>
          <ArrowBackIcon
            style={{ fontSize: "20px", color: "white", marginRight: "8px" }}
          />
          Back to Explore
        </BackButton>
        <HeaderContent>
          <CourseTitle>{title}</CourseTitle>
          <CourseStats>
            <StatItem>
              <BookOutlined
                style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.9)" }}
              />
              {chaptersCount} Chapters
            </StatItem>
            <StatItem>
              <PlayCircleOutlined
                style={{ fontSize: "16px", color: "rgba(255, 255, 255, 0.9)" }}
              />
              {lessonsCount} Lessons
            </StatItem>
          </CourseStats>
          {price && <PriceTag>Price: {price} VND</PriceTag>}
          <ActionButtons>
            {!hasPurchased && (
              <PrimaryButton onClick={showPurchaseModal}>
                Start Learning
              </PrimaryButton>
            )}
            <SecondaryButton onClick={handleShare}>
              <ShareAltOutlined
                style={{ fontSize: "16px", marginRight: "1px" }}
              />
              Share
            </SecondaryButton>
          </ActionButtons>
        </HeaderContent>
      </HeaderContainer>
    </StyledHeaderSection>
  );
};

export default HeaderSection;

// Styled Components
const StyledHeaderSection = styled.div`
  padding: 32px;
  color: white;
  display: flex;
  align-items: center;
  gap: 32px;
  background-image: ${({ $bgImage }) =>
    $bgImage
      ? `url(${$bgImage})`
      : "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 280px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const HeaderContainer = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const BackButton = styled.button`
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  display: flex;
  align-items: center;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: translateX(-4px);
  }
`;

const HeaderContent = styled.div`
  margin-top: 24px;
`;

const CourseTitle = styled.h1`
  color: white;
  font-size: 40px;
  font-weight: bold;
  margin: 0 0 16px 0;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
`;

const CourseStats = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
`;

const PriceTag = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: white;
  margin-bottom: 24px;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
`;

const PrimaryButton = styled.button`
  background: #0070f3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #0061d5;
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;
