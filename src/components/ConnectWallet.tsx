import React from "react";
import styled from "styled-components";

const SConnect = styled.div`
  width: 10.5rem;
  padding: 0 0.75rem;
  height: 3rem;
  background: linear-gradient(90deg, #bc9dfc -26.5%, #ff26c2 150.75%);
  border-radius: 17.3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

const SButtonText = styled.div`
  color: white;
  font-size: 1.25rem;
  align-items: center;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 2rem;
`;

const ConnectWallet = () => {
  return (
    <SConnect>
      <img src="Wallet.svg" alt="" />
      <SButtonText>Connected</SButtonText>
    </SConnect>
  );
};

export default ConnectWallet;
