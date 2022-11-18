import AutoComplete from "../components/AutoComplete";
import {
  Container
} from "./HomePage.style";

const HomePage = () => {
  return (
    <Container>
      <div>
        <h1>Search X</h1>
      </div>
      <div>
        <AutoComplete query="" autoFocus={true} />
      </div>
    </Container>
  );
};

export default HomePage;