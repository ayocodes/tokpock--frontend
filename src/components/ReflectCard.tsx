import React from "react";
import styled from "styled-components";

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

const STextBorderContainer = styled.div`
  display: flex;
  position: relative;

  flex: 1;
`;

const STextBorder = styled.div`
  mix-blend-mode: overlay;
  position: absolute;
  inset: 0;
  border: 2px solid #ffffff;
  border-radius: 0.5rem;
`;

const STextArea = styled.textarea`
  border: 2px solid transparent;
  font-size: 16px;
  padding: 1rem;
  margin-top: 0.2em;
  margin-bottom: 0;
  border-radius: 0.5rem;
  background-color: transparent;
  resize: none;
  outline: none;
  color: white;
  flex: 1;
`;

const SButton = styled.div`
  background: linear-gradient(180deg, #3e404b 0%, #232429 100%);
  /* background: yellow; */
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
`

const ReflectCard: React.FC = () => {
  return (
    <SBox>
      <SButtonLeft />
      <SCard>
        <STitle>Question</STitle>
        <SQA>Hey, how are you feeling today?</SQA>
        <STitle>Response</STitle>
        <STextBorderContainer>
          <STextArea
            id="description"
          />
          <STextBorder />
        </STextBorderContainer>
      </SCard>
      <SButtonRight/>

    </SBox>
  );
};

export default ReflectCard;
