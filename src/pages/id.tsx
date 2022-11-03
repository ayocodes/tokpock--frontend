import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Operations from "../components/Operations";
import ProjectChoice from "../components/ProjectChoice";
import ReflectCard from "../components/ReflectCard";
import ReflectIndicator from "../components/ReflectIndicator";
import Exp from "../components/Question";

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

const getPane = () => {
  const [projectInit, setProjectInit] = useState(false);
  if (projectInit) {
    return (
      <>
        <ReflectIndicator />
        <Exp />
        <Operations />
      </>
    );
  } else {
    return <ProjectChoice setProjectInit={setProjectInit} />;
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
