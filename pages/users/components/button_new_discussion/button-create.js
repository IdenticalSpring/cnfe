import { useState } from "react";
import PostDiscussion from "../../discussions/create_discussion";
import styled from "styled-components";

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const ButtonCreateDiscussion = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <PostDiscussion isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default ButtonCreateDiscussion;
