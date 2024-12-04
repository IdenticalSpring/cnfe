import React from "react";
import DefaultLayout from "@/layout/DefaultLayout";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

// Styled components
const Section = styled.section`
  position: relative;
  padding: 32px 0;
  width: 100%;
  background-image: url("/assets/img/nen.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 16px 0;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 0 16px;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 8px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  margin-top: 45px;

  @media (max-width: 768px) {
    gap: 16px;
    margin-top: 30px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--background-color);
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(33.33% - 32px);
  max-width: calc(33.33% - 32px);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: var(--background-hover-color);
    transform: translateY(-10px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(2px);
  }

  @media (max-width: 768px) {
    flex: 1 1 calc(100% - 16px);
    max-width: calc(100% - 16px);
    padding: 16px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Text = styled.p`
  font-size: 16px;
  margin-top: 5px;
  color: var(--grey-color);
  margin-bottom: 16px;
  flex-grow: 1;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 12px;
  }
`;

const Title_Head = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #ff9900;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 16px;
  }
`;

const StyledLink = styled.a`
  display: inline-block;
  margin-top: auto;
  color: #66ccff;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
const BackgroundVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const features = [
  {
    id: "feature-1",
    icon: "🔧",
    title: "A New Way to Learn",
    description:
      "MasterCoding is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.",
    link: "/auth/signup",
    linkText: "Sign Up >>>",
  },
  {
    id: "feature-2",
    icon: "⚙️",
    title: "Start Exploring",
    description:
      "Explore is a well-organized tool that helps you get the most out of MasterCoding by providing structure to guide your progress towards the next step in your programming career.",
    link: "/users/course",
    linkText: "Explore Now >>>",
  },
  {
    id: "feature-3",
    icon: "📊",
    title: "Questions, Community & Contests",
    description:
      "Over 3450 questions for you to practice. Come and join one of the largest tech communities with hundreds of thousands of active users and participate in our contests to challenge yourself and earn rewards.",
    link: "/users/problems",
    linkText: "View Questions >>>",
  },
  {
    id: "feature-4",
    icon: "📈",
    title: "Companies & Candida tes",
    description:
      "Not only does MasterCoding prepare candidates for technical interviews, we also help companies identify top technical talent. From sponsoring contests to providing online assessments and training, we offer numerous services to businesses.",
    link: "/",
    linkText: "Learn More >>>",
  },
  {
    id: "feature-5",
    icon: "🔧",
    title: "Developer",
    description:
      "We now support 14 popular coding languages. At our core, MasterCoding is about developers. Our powerful development tools such as Playground help you test, debug and even write your own projects online.",
    link: "/users/developer",
    linkText: "Developer Tools >>>",
  },
  {
    id: "feature-6",
    icon: "📈",
    title: "Companies & Candidates",
    description:
      "Not only does MasterCoding prepare candidates for technical interviews, we also help companies identify top technical talent. From sponsoring contests to providing online assessments and training, we offer numerous services to businesses.",
    link: "/",
    linkText: "Learn More >>>",
  },
  {
    id: "feature-7",
    icon: "🔧",
    title: "Developer",
    description:
      "We now support 14 popular coding languages. At our core, MasterCoding is about developers. Our powerful development tools such as Playground help you test, debug and even write your own projects online.",
    link: "/",
    linkText: "Developer Tools >>>",
  },
  {
    id: "feature-8",
    icon: "📈",
    title: "Companies & Candidates",
    description:
      "Not only does MasterCoding prepare candidates for technical interviews, we also help companies identify top technical talent. From sponsoring contests to providing online assessments and training, we offer numerous services to businesses.",
    link: "/",
    linkText: "Learn More >>>",
  },
];

export default function HomePage() {
  return (
    <DefaultLayout>
      <Section>
        <Container>
          <Title_Head>
            This is a smart programming learning support website.
          </Title_Head>

          <Text>
            At MasterCoding, our mission is to help you improve yourself and
            land your dream job.
          </Text>
          <FlexContainer>
            {features.map((feature) => (
              <Card key={feature.id}>
                <IconWrapper>
                  {/* <Image
                    src={`https://openui.fly.dev/openui/24x24.svg?text=${encodeURIComponent(feature.icon)}`}
                    alt="feature-icon"
                    width={24}  // Đặt chiều rộng ảnh
                    height={24} // Đặt chiều cao ảnh
                    onError={(e) => { e.target.onerror = null; e.target.src = '/path/to/default/icon.svg'; }}
                  /> */}
                </IconWrapper>
                <Title>{feature.title}</Title>
                <Text>{feature.description}</Text>
                <Link href={feature.link} passHref legacyBehavior>
                  <StyledLink>{feature.linkText}</StyledLink>
                </Link>
              </Card>
            ))}
          </FlexContainer>
        </Container>
      </Section>
    </DefaultLayout>
  );
}
