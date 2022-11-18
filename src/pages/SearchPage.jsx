import { useSearchParams } from "react-router-dom";
import AutoComplete from "../components/AutoComplete";
import ResultList from "../components/ResultList";
import {
  Container,
  SubContainer,
  AutoCompleteContainer,
  TitleContainer,
} from "./SearchPage.style";

const SearchPage = () => {
  const {
    query,
    page
  } = useSearch();

  return (
    <Container>
      <SubContainer>
        <TitleContainer to="/">Search X</TitleContainer>
        <AutoCompleteContainer>
          <AutoComplete query={query} />
        </AutoCompleteContainer>
      </SubContainer>
      <SubContainer>
        <ResultList query={query} page={page} />
      </SubContainer>
    </Container>
  );
};

const useSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const page = searchParams.get("page");
  
  return {
    query,
    page
  };
};

export default SearchPage;