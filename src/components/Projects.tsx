import React from "react";
import styled from "styled-components";

const SProject = styled.div`
  display: flex;
  /* background-color: blue; */
  flex: 1;
  flex-direction: column;
  margin-left: 1.5rem;
`;

const SNewProject = styled.div`
  width: 15rem;
  height: 3.8rem;
  border: 2px solid #565967;
  border-radius: 1rem;
  display: flex;
  justify-content: space-between;
  margin: 1.25rem 0;
  padding: 1rem;
  cursor: pointer;
`;

const SCreatedProjects = styled.div`
border-top: 2px solid #565967;;
`;

const Projects = () => {
  return (
    <SProject>
      <SNewProject>
        <p>Create new contract</p>
        <img src="add.svg" alt="" style={{width: "1rem"}}/>
      </SNewProject>
      <SCreatedProjects>

      </SCreatedProjects>
    </SProject>
  );
};

export default Projects;
