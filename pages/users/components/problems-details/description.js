import React from 'react';
import styled from 'styled-components';

const ProblemTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProblemDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;

const DescriptionContainer = styled.div`
  height: 100vh; /* Đảm bảo chiếm toàn bộ chiều cao của trang */
  max-height: 100vh; /* Đặt chiều cao tối đa bằng chiều cao của trang */
  overflow: auto; /* Kích hoạt cuộn cho phần nội dung */
  display: flex;
  flex-direction: column; /* Đảm bảo phần nội dung bên trong được xếp theo chiều dọc */
`;

// Sticky header giữ vị trí cố định khi cuộn
const ProblemHeader = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--background-hover-color); 
  border-bottom: 1px solid #ddd;
  font-weight: bold;
  padding: 10px 20px;
  z-index: 100;
`;

const ProblemContent = styled.div`
  flex-grow: 1; /* Cho phép nội dung bên dưới header mở rộng và chiếm không gian còn lại */
  padding: 20px;
`;

const Description = ({ title, description }) => (
    <DescriptionContainer>
        <ProblemHeader>{title}</ProblemHeader>
        <ProblemContent>
            <ProblemDescription>{description}</ProblemDescription>
        </ProblemContent>
    </DescriptionContainer>
);

export default Description;

