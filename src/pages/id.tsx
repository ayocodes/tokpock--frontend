import { useState } from "react";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Operations from "../components/Operations";
import ProjectChoice from "../components/ProjectChoice";
import Question from "../components/Question";
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

const GetPane = () => {
  const [projectInit, setProjectInit] = useState(false);
  if (projectInit) {
    return (
      <>
        <ReflectIndicator />
        <Question />
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
        <SBox>{GetPane()}</SBox>
      </SMain>
    </SBody>
  );
};

export default ID;
