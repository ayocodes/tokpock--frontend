import React from "react";
import styled from "styled-components";

const SSubmit = styled.div`
  height: 3rem;
  width: 100%;
  background: #565967;
  border-radius: 10px;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const SButtonText = styled.p`
  color: white;
  font-size: 1.25rem;
  align-items: center;
  font-weight: 400;
`;

const SubmitButton = () => {
  return (
    <SSubmit>
      <SButtonText>Submit</SButtonText>
    </SSubmit>
  );
};

export default SubmitButton;
