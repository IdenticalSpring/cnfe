import React from 'react';
import ProfileInfo from './ProfileInfo'; 
import CompletedCourses from './CompletedCourses'; 
import CompletedProblem from './CompletedAssignments'; 
import styled from 'styled-components';
import { Header } from '@/layout/Header';

// Styled component for the container
const ProfileContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileIndex = () => {
  return (
    <>
    <Header/>
      <ProfileContainer>
        <h1>User Profile</h1>
        <ProfileInfo />
        <CompletedCourses />
        <CompletedProblem />
      </ProfileContainer>
    </>
  );
};

export default ProfileIndex;
