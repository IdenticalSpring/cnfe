import React from 'react';
import DefaultLayout from '@/layout/DefaultLayout';
import styled from 'styled-components';
import Link from 'next/link';

// Styled components
const Section = styled.section`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 32px 0;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  padding: 0 16px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  margin-top: 45px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column; /* Chuyển hướng các phần tử con thành cột */
  background-color: ${({ theme }) => theme.colors.card};
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  flex: 1 1 calc(33.33% - 32px); 
  max-width: calc(33.33% - 32px);
  cursor: pointer;
  &:hover{
    background-color: rgba(0, 0, 0, 0.05);
  }
  &:active {
    transform: translateY(2px);
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
`;

const Text = styled.p`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.colors.grey};
  margin-bottom: 16px;
  flex-grow: 1;
`;

const Title_Head = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #FF9900;
`;

const StyledLink = styled.a`
  display: inline-block;
  margin-top: auto; 
  color: #66CCFF;
  font-weight: 500;
  text-decoration: none;
  &:hover{
      text-decoration: underline;
  }
`;

const features = [
  {
    id: 'feature-1',
    icon: '🔧',
    title: 'A New Way to Learn',
    description: 'MasterCoding is the best platform to help you enhance your skills, expand your knowledge and prepare for technical interviews.',
    link: '/signin',
    linkText: 'Sign Up >>>'
  },
  {
    id: 'feature-2',
    icon: '⚙️',
    title: 'Start Exploring',
    description: 'Explore is a well-organized tool that helps you get the most out of MasterCoding by providing structure to guide your progress towards the next step in your programming career.',
    link: '/explore',
    linkText: 'Explore Now >>>'
  },
  {
    id: 'feature-3',
    icon: '📊',
    title: 'Questions, Community & Contests',
    description: 'Over 3450 questions for you to practice. Come and join one of the largest tech communities with hundreds of thousands of active users and participate in our contests to challenge yourself and earn rewards.',
    link: '/product',
    linkText: 'View Questions >>>'
  },
  {
    id: 'feature-4',
    icon: '📈',
    title: 'Companies & Candidates',
    description: 'Not only does MasterCoding prepare candidates for technical interviews, we also help companies identify top technical talent. From sponsoring contests to providing online assessments and training, we offer numerous services to businesses.',
    link: '/companies',
    linkText: 'Learn More >>>'
  },
  {
    id: 'feature-5',
    icon: '🔧',
    title: 'Developer',
    description: 'We now support 14 popular coding languages. At our core, MasterCoding is about developers. Our powerful development tools such as Playground help you test, debug and even write your own projects online.',
    link: '/developer',
    linkText: 'Developer Tools >>>'
  }
];


export default function HomePage() {
  return (
    <DefaultLayout>
      <Section>
        <Container>
          <Title_Head>
            This is a smart programming learning support website.
          </Title_Head>

          <Text>At LeetCode, our mission is to help you improve yourself and land your dream job.</Text>

          <FlexContainer>
            {features.map(feature => (
              <Card key={feature.id}>
                <IconWrapper>
                  <img
                    src={`https://openui.fly.dev/openui/24x24.svg?text=${encodeURIComponent(feature.icon)}`}
                    alt="feature-icon"
                  />
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
