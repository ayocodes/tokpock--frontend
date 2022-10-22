import React from "react";
import styled from "styled-components";
import Button from "./Button";

const SIntro = styled.div`
  max-width: 33rem;
  display: flex;
  flex-direction: column;

  @media (max-width: 957px) {
    align-items: center;
  } ;
`;

const STitle = styled.p`
  font-size: 2.5rem;
  line-height: 3rem;
  font-weight: 500;
  color: #333333;

  @media (max-width: 957px) {
    text-align: center;
  } ;
`;

const SExplainP = styled.p`
  font-size: 1.1rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: #5f6368;

  @media (max-width: 957px) {
    text-align: center;
  } ;
`;

const SExplain = styled.div`
  width: 25.5rem;
  margin-top: 1.25rem;
  margin-bottom: 3.4rem;
  font-weight: 400;
`;

const SBox = styled.div`
  display: flex;

  @media (max-width: 957px) {
    justify-content: center;
  } ;
`;

const IntroMessage = () => {
  return (
    <SIntro>
      <STitle>Your users aren’t on Web3?</STitle>
      <STitle>Let’s fix that!</STitle>
      <SExplain>
        <SExplainP>
          TockPock creates temporary smart wallets that hold tokens for your
          user, till they are ready for withdrawal.
        </SExplainP>
      </SExplain>
      <SBox>
        <Button href={"/app"}>Create wallet</Button>
        <Button href={"/withdraw"}>Withdraw</Button>
      </SBox>
    </SIntro>
  );
};

export default IntroMessage;
