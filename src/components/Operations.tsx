import React from "react";
import styled from "styled-components";

const SOperations = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1;
  bottom: 2rem;
  padding: 0.5rem 1rem;
  background: black;
  width: 13.25rem;
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;
  margin-top: 3rem;
`;

const SImg = styled.img`
  cursor: pointer;
  transition: transform 200ms linear;
  :hover {
    transform: translateY(-3px);
  }
`;

const Operations = () => {
  return (
    <SOperations>
      <SImg src="Home.svg" alt="" />
      <SImg src="Chat.svg" alt="" />
      <SImg src="Document.svg" alt="" />
      <SImg src="Info.svg" alt="" />
    </SOperations>
  );
};

export default Operations;
