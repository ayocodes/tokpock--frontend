import React from "react";
import styled from "styled-components";
import SubmitButton from "../components/SubmitButton";

const SModal = styled.div`
  position: fixed;
  inset: 0;
  background: linear-gradient(180deg, #292a31 -12.63%, #000000 100%);
  display: grid;
  place-items: center;
  z-index: 2000;
`;

const SWithdraw = styled.div`
  display: flex;
  flex-direction: column;
  width: 24rem;
  background: linear-gradient(180deg, #3e404b 0%, #232429 100%);
  border-radius: 20px;
  padding: 40px;
`;

const STitle = styled.p`
  font-size: 1rem;
  mix-blend-mode: overlay;
  padding-bottom: 10px;
`;

const STextArea = styled.input`
  border: 2px solid #626575;
  height: 50px;
  font-size: 16px;
  padding: 0 0.5rem;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  background-color: transparent;
  resize: none;
  outline: none;
  color: white;
`;

const SSubmitBox = styled.div`
  display: grid;
  place-items: center;
  margin-top: 2rem;
`;

const SRing1 = styled.img`
  position: fixed;
  z-index: -1;
  left: 420.36px;
  top: -104.5px;
`;

const SRing2 = styled(SRing1)`
  left: 298.36px;
  top: 230.5px;
`;

const SRingBox = styled.div`
`

const withdraw = () => {
  return (
    <SModal>
      <SRingBox>
        <SRing1 src="ring.svg" alt="" />
        <SRing2 src="ring.svg" alt="" />
      </SRingBox>
      <SWithdraw>
        <STitle>Email</STitle>
        <STextArea id="description" />
        <STitle>Recovery Phase</STitle>
        <STextArea id="description" />
        <STitle>Password</STitle>
        <STextArea id="description" />
        <SSubmitBox>
          <SubmitButton />
        </SSubmitBox>
      </SWithdraw>
    </SModal>
  );
};

export default withdraw;
