import React from "react";
import styled from "styled-components";

interface IReflectIndicator {
  index: number;
  active: boolean;
}

const SReflectIndicator = styled.div`
  display: flex;
  margin-bottom: 0.8rem;
  height: 0.3rem;
  width: 22.6rem;

  justify-content: space-between;
`;

const SIndicator = styled.div`
  flex: 1;
  width: 2rem;
  margin: 0 0.1rem;
  background: #707070;
`;

const ReflectIndicator: React.FC = () => {
  const dummy = [1, 2, 3, 4, 6, 9, 8, 0];
  return (
    <SReflectIndicator>
      {dummy.map((_, i) => (
        <>
          <SIndicator
          // active={active}
          />
        </>
      ))}
    </SReflectIndicator>
  );
};

export default ReflectIndicator;
