import React from "react";
import styled from "styled-components";

const SSideBar = styled.div`
  margin: 1.25rem 0;
  padding-left: 1rem;
  width: 10.5rem;
  height: 75vh;
  border-right: 2px solid #565967;;
`;

const SItem = styled.div`
  display: flex;
  margin-top: 1.5rem;
`;

const SItemP = styled.p`
  margin-left: 0.8rem;
`;

const SideBar = () => {
  return (
    <SSideBar>
      <SItem>
        <img src="Draft.svg" alt="" />
        <SItemP>Draft</SItemP>
      </SItem>
      <SItem>
        <img src="Deployed.svg" alt="" />
        <SItemP>Deployed</SItemP>
      </SItem>
    </SSideBar>
  );
};

export default SideBar;
