import React from "react";
import styled from "styled-components";
import SubmitButton from "./SubmitButton";

const SCard = styled.div`
  background: linear-gradient(180deg, #3e404b 0%, #232429 100%);
  width: 20rem;
  height: 29rem;
  display: flex;
  flex-direction: column;
  padding: 1.6rem 0;
  position: relative;
`;

const STitle = styled.p`
  font-size: 1rem;
  mix-blend-mode: overlay;
  padding-bottom: 0.3rem;
`;

const SQA = styled.p`
  font-size: 1.4rem;
  padding-bottom: 1rem;
`;

const STextArea = styled.textarea`
  border: 2px solid #626575;
  font-size: 16px;
  padding: 1rem;
  margin-top: 0.2em;
  margin-bottom: 2em;
  border-radius: 0.5rem;
  background-color: transparent;
  resize: none;
  outline: none;
  color: white;
  flex: 1;
`;

const SButton = styled.div`
  background: linear-gradient(180deg, #3e404b 0%, #232429 100%);
  width: 1.5rem;
  cursor: pointer;
  flex: 1;
`;

const SButtonLeft = styled(SButton)`
  border-radius: 1.5rem 0 0 1.5rem;
`;
const SButtonRight = styled(SButton)`
  border-radius: 0 1.5rem 1.5rem 0;
`;

const SBox = styled.div`
  display: flex;
`;

const ReflectCard: React.FC = () => {
  return (
    <SBox>
      <SButtonLeft />
      <SCard>
        <STitle>Question</STitle>
        <SQA>Hey, how are you feeling today?</SQA>
        <STitle>Response</STitle>
        <STextArea id="description" />
        <SubmitButton />
      </SCard>
      <SButtonRight />
    </SBox>
  );
};

export default ReflectCard;
