import React from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { Header } from '@/layout/Header';
import ProfileInfo from './ProfileInfo';
import CompletedCourses from './CompletedCourses';
import CompletedAssignments from './CompletedAssignments';

const { Content } = Layout;

const ProfileContainer = styled(Content)`
  padding: 24px;
  background-color: #f0f2f5;
  min-height: calc(100vh - 64px);
`;

const ProfileIndex = () => {
  return (
    <Layout>
      <Header />
      <ProfileContainer>
        <ProfileInfo />
        <CompletedCourses />
        <CompletedAssignments />
      </ProfileContainer>
    </Layout>
  );
};

export default ProfileIndex;