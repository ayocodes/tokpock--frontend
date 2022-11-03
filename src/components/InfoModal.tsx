import React, { useContext } from "react";
import styled from "styled-components";
import InfoModalContext from "../context/infoModal";

// interface IModal {
//   modal: boolean;
//   setModal: React.Dispatch<React.SetStateAction<boolean>>;
// }

const SModal = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: end;
  justify-content: end;
  z-index: 2000;
`;
const SInfoModal = styled.div`
  width: 20rem;
  height: 20rem;
  border-radius: 1rem;
  background-color: #2c2d32;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const SHeader = styled.div`
  display: flex;
  justify-content: end;
  margin: 1rem;
  height: 2rem;
`;

const SCloseBox = styled.div`
  width: 2rem;
  height: 2rem;
  background: black;
  display: grid;
  place-items: center;
  border-radius: 50%;
  cursor: pointer;
`;

const InfoModal = () => {
  const [modal, setModal] = useContext<any>(InfoModalContext);

  if (!modal) {
    return null;
  }

  return (
    <SModal>
      <SInfoModal>
        <SHeader>
          <SCloseBox>
            <img
              onClick={() => setModal(false)}
              src="close slim.svg"
              alt=""
              style={{ width: ".8rem" }}
            />
          </SCloseBox>
        </SHeader>
      </SInfoModal>
    </SModal>
  );
};

export default InfoModal;
