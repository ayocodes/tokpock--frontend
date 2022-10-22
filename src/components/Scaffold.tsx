import styled from "styled-components";

interface IScaffoldProp {
  children: React.ReactNode;
}

const Scaffold: React.FC<IScaffoldProp> = ({ children }) => {
  return (
    <>
      <>{children}</>
    </>
  );
};

export default Scaffold;
