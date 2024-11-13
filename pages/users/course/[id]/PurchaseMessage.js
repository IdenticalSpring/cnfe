import React from 'react';
import styled from 'styled-components';

const PurchaseMessage = ({ message }) => (
    <MessageContainer>
        <Message>
            {message}
        </Message>
    </MessageContainer>
);

export default PurchaseMessage;

// Styled Components
const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 200px); /* Adjusted height if needed */
  width: 100%; /* Ensure it spans full width */
  padding-top: 100px; /* Optional padding to adjust position if header affects centering */
`;


const Message = styled.div`
  padding: 50px;
  background-color: #ffe6e6;
  color: #d9534f;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
`;
