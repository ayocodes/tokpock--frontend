import { SetStateAction, useState } from "react";
import styled from "styled-components";
import InfoModal from "./InfoModal";

interface IScaffoldProp {
  children: React.ReactNode;
}

const Scaffold: React.FC<IScaffoldProp> = ({ children }) => {
  const [infoModal, setInfoModal] = useState(true);

  return (
    <>
      <InfoModal/>
      <div>{children}</div>
    </>
  );
};

export default Scaffold;
