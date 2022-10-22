import styled from "styled-components";

const SButton = styled.div`
  background-color: red;
  width: 1.3rem;
  cursor: pointer;
  z-index: 1;
`;

const SButtonLeft = styled(SButton)`
  border-radius: 1.5rem 0 0 1.5rem;
`;
const SButtonRight = styled(SButton)`
  border-radius: 0 1.5rem 1.5rem 0;
`;

const SReflectNav = styled.div`
  position: fixed;
  left: 50%;
  transform: translate(117.3%, 0);
  z-index: 1;
  inset: 0;
  display: flex;
  margin: 1.5rem;
  margin-top: 9.7rem;
  width: 23rem;
  justify-content: space-between;
`;

const ReflectNav = () => {
  return (
    <SReflectNav>
      <SButtonLeft onClick={() => alert("left!")}></SButtonLeft>
      <SButtonRight onClick={() => alert("Right!")}></SButtonRight>
    </SReflectNav>
  );
};

export default ReflectNav;
