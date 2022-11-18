import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { doSearch } from "../service/mockSearchService"
import {
  MetadataContainer,
  ResultContainer,
  ResultTitle,
  ResultDescription,
  PaginationButton,
} from "./ResultList.style";

const ResultList = ({ query, page }) => {
  const {
    results,
    metadata,
    handleNext,
    handlePrev,
  } = useResultList({ query, page });

  return (
    <div>
      <MetadataContainer>
        {`About ${metadata.searchResults} results
          (${metadata.exectionTime.toFixed(1)} miliseconds)`}
      </MetadataContainer>
      { results?.map( (entry, index) => 
        <ResultContainer key={index}>
          <ResultTitle target="_blank" href={entry.link}>{entry.title}</ResultTitle>
          <ResultDescription>{entry.description}</ResultDescription>
        </ResultContainer>
      )}
      <div>
        <PaginationButton onClick={handlePrev}>&lt;</PaginationButton>
        <PaginationButton onClick={handleNext}>&gt;</PaginationButton>
      </div>
    </div>
  );
};

const useResultList = ({ query, page }) => {
  const [, setSearchParams] = useSearchParams();
  
  let pageNumber = parseInt(page)
  pageNumber = pageNumber > 0 ? pageNumber : 1
  
  const { results, metadata } = useMemo(() => {
    return doSearch(query, pageNumber)
  }, [query, pageNumber]);
  
  const handleNext = useCallback(() => { 
    setSearchParams({ q: query, page: pageNumber + 1 })
  }, [query, pageNumber, setSearchParams]);

  const handlePrev = useCallback(() => {
    setSearchParams({ q: query, page: pageNumber - 1 }) 
  }, [query, pageNumber, setSearchParams]);

  return {
    results,
    metadata,
    handleNext,
    handlePrev,
  };
};

export default ResultList;