import React, { useCallback } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Operations from "../components/Operations";
import ProjectChoice from "../components/ProjectChoice";
import ReflectCard from "../components/ReflectCard";
import ReflectIndicator from "../components/ReflectIndicator";

const SBody = styled.div`
  display: flex;
  justify-content: center;
`;

const SMain = styled.div`
  width: 100%;
  max-width: 95vw;
  margin: 1rem;
  display: flex;
  flex-direction: column;
`;

const SBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 5rem;
`;

const projectInit = false;

const getPane = () => {
  if (projectInit) {
    return (
      <>
        <ReflectIndicator />
        <ReflectCard />
        <Operations />
      </>
    );
  } else {
    return <ProjectChoice />;
  }
};

const ID = () => {
  return (
    <SBody>
      <SMain>
        <Navbar />
        <SBox>{getPane()}</SBox>
      </SMain>
    </SBody>
  );
};

export default ID;
