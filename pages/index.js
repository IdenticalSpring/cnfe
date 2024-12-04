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
    icon: "🚀",
    title: "Accelerate Your Learning",
    description:
      "Take your coding skills to the next level with personalized learning paths and real-time feedback on your progress. MasterCoding is your partner in the journey to mastering programming.",
    link: "/auth/signup",
    linkText: "Join the Movement >>>",
  },
  {
    id: "feature-2",
    icon: "🧑‍💻",
    title: "Interactive Coding Playground",
    description:
      "MasterCoding’s Playground allows you to test and debug your code in real-time, with support for 14 popular programming languages. Start coding, experimenting, and building projects directly in your browser.",
    link: "/users/problems",
    linkText: "Start Coding Now >>>",
  },
  {
    id: "feature-3",
    icon: "🏆",
    title: "Coding Challenges & Competitions",
    description:
      "Push yourself with coding challenges and participate in regular coding competitions. Earn recognition, rewards, and improve your coding skills while competing with a global community.",
    link: "/users/problems",
    linkText: "Join a Contest >>>",
  },
  {
    id: "feature-4",
    icon: "🔍",
    title: "Explore Courses and Tutorials",
    description:
      "MasterCoding offers a vast library of courses and tutorials designed for all levels, from beginner to advanced. Explore structured learning content and get hands-on with coding challenges to solidify your knowledge.",
    link: "/users/course",
    linkText: "Browse Courses >>>",
  },
  {
    id: "feature-5",
    icon: "👥",
    title: "Networking & Community",
    description:
      "Join one of the largest tech communities with over 100,000 active users. Collaborate with peers, ask questions, and get advice from experienced developers. Your next project might be just a conversation away.",
    link: "/users/discussions",
    linkText: "Join the Community >>>",
  },
  {
    id: "feature-6",
    icon: "💼",
    title: "Job Opportunities & Career Growth",
    description:
      "MasterCoding connects developers with companies looking for top talent. Apply for jobs, attend career fairs, and gain exposure to tech companies worldwide. Let us help you shape your career.",
    link: "/users/discussions",
    linkText: "Find Your Next Job >>>",
  },
  {
    id: "feature-7",
    icon: "🎓",
    title: "Certification & Credentials",
    description:
      "Earn certifications for completed courses and coding challenges. MasterCoding provides recognized certificates that can enhance your resume and demonstrate your expertise to potential employers.",
    link: "/users/course",
    linkText: "Get Certified >>>",
  },
  {
    id: "feature-8",
    icon: "🌐",
    title: "Global Coding Network",
    description:
      "MasterCoding connects developers from all around the world. Participate in global coding competitions, collaborate with developers across borders, and expand your network in the global tech community.",
    link: "/users/discussions",
    linkText: "Connect Globally >>>",
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
