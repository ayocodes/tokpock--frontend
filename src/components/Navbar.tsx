import React from "react";
import styled from "styled-components";
import ConnectWallet from "./ConnectWallet";

interface ITitleProps {
  children: React.ReactNode;
  link?: any;
}

const Simg = styled.img`
  display: none;
  transition: 200ms ease-in-out;
`;

const SNavButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 15ch;
  height: 3rem;
  margin-right: 1rem;
  overflow: hidden;
  padding: 0 0.8rem;
  background: #565967;
  border-radius: 17.3px;
  cursor: pointer;
  transition: 200ms ease-in-out;

  :hover {
    ${Simg} {
      display: block;
    }
  }
`;

const SNavButtonText = styled.div`
  color: white;
  font-size: 1.25rem;
  align-items: center;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 2rem;
`;

const SNavBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95vw;
  max-width: 1200px;
  background: #2c2d32;
  border-radius: 20px;
  padding: 0.75rem;
  white-space: nowrap;
`;
const SNavBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: sticky;
  top: 1rem;
  z-index: 1;
`;

const SNavButtons = styled.div`
  display: flex;
  overflow: auto;
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
`;

const SBox = styled.div`
  display: flex;
  width: 76%;
`;

const Navbar = () => {

  return (
    <SNavBar>
      <SNavBarContainer>
        <SBox>
          <SNavButtons>
            <NavButton>Project 1</NavButton>
          </SNavButtons>
          <img
            src="add.svg"
            alt=""
            style={{ marginLeft: "10px", cursor: "pointer" }}
          />
        </SBox>
        <ConnectWallet />
      </SNavBarContainer>
    </SNavBar>
  );
};

const NavButton: React.FC<ITitleProps> = ({ children, link }) => {
  return (
    <SNavButton onClick={link}>
      <SNavButtonText>{children}</SNavButtonText>
      <Simg src="close.svg" alt="" />
    </SNavButton>
  );
};

export default Navbar;
