import React from "react";
import styled from "styled-components";

interface CardStyleProps {
  color: any;
}

interface IProjectInitProps {
  setProjectInit: React.Dispatch<React.SetStateAction<boolean>>;
}

const SBody = styled.div`
  display: flex;
  justify-content: center;
  /* background: red; */
  width: 100%;
`;

const SProjectChoiceBox = styled.div`
  display: flex;
  width: 100%;
  max-width: 80vw;

  justify-content: center;
  flex-direction: column;
`;

const SCard = styled.div<CardStyleProps>`
  display: grid;
  place-items: center;
  color: white;
  height: 12rem;
  width: 18rem;
  border-radius: 1rem;
  background-color: ${({ color }) => color};
  background-image: url("rustic-triangles.png");
  transition: 300ms ease-in-out;
  cursor: pointer;
  font-weight: 500;
  font-size: 2rem;
`;

const SCardBox = styled.div`
  margin-top: 2rem;
  display: grid;
  place-content: center;
  /* background-color: white; */
  /* align-items: flex-start; */
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(16.5rem, 1fr));
`;

const STitle = styled.p`
  margin-top: 3rem;
  font-weight: 600;
  font-size: 1.2rem;
`;

const projectChoice = [
  // {
  //   title: "Save NFT",
  //   color: "#221CA7",
  // },
  // {
  //   title: "Save Tokens",
  //   color: "#FF3070",
  // },
  {
    title: "Save Algo",
    color: "#FF30F7",
  },
];

const ProjectChoice: React.FC<IProjectInitProps> = ({ setProjectInit }) => {
  return (
    <SBody>
      <SProjectChoiceBox>
        <STitle>What do you want to do?</STitle>
        <SCardBox>
          {projectChoice.map((x, i) => (
            <SCard key={i} onClick={() => setProjectInit(true)} color={x.color}>
              {x.title}
            </SCard>
          ))}
        </SCardBox>
      </SProjectChoiceBox>
    </SBody>
  );
};

export default ProjectChoice;
