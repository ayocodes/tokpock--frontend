import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import InfoModalContext from "../context/infoModal";

const SOperations = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 1;
  bottom: 2rem;
  padding: 0.5rem 1rem;
  background: black;
  width: 13.25rem;
  display: flex;
  justify-content: space-between;
  border-radius: 1rem;
  margin-top: 3rem;
`;

const SImg = styled.img`
  display: grid;
  cursor: pointer;
  transition: transform 200ms linear;
  :hover {
    transform: translateY(-3px);
  }
`;

const Operations = () => {
  const [_, setModal] = useContext<any>(InfoModalContext);

  return (
    <SOperations>
      <Link href={"/"}>
        <a>
          <SImg src="Home.svg" alt="" />
        </a>
      </Link>
      <a href="https://github.com/ayocodes/tokpock" target="_blank" rel="noreferrer">
        <SImg src="Document.svg" alt="" />
      </a>
      <SImg src="Info.svg" alt="" onClick={() => setModal(true)} />
    </SOperations>
  );
};

export default Operations;
