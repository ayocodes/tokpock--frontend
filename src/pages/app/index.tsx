import styled from "styled-components";
import Navbar from "../../components/Navbar";
import Projects from "../../components/Projects";
import SideBar from "../../components/SideBar";

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

const SBodyBox = styled.div`
  display: flex;
`;

const App = () => {
  return (
    <SBody>
      <SMain>
          <Navbar />
        <SBodyBox>
          <SideBar />
          <Projects />
        </SBodyBox>
      </SMain>
    </SBody>
  );
};

export default App;
