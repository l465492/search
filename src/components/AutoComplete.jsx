import { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { doSearch } from "../service/mockSearchService"
import {
  Container,
  InputContainer,
  Icon,
  InputField,
  SuggestionsContainer,
  SuggestionItem,
  SuggestionTitle,
  SuggestionRemoveButton
} from "./AutoComplete.style";

const AutoComplete = ({ query, autoFocus }) => {
  const {
    inputRef,
    inputValue,
    isSearchHistory,
    suggestions,
    handleChange,
    handleSubmit,
    handleSelect,
    handleRemove,
    handleFocus,
    handleBlur
  } = useAutoComplete({ query });
  
  return (
    <Container>
      <InputContainer>
        <Icon>
          <img src="/search.svg" alt="search" />
        </Icon>
        <InputField
          type="text"
          autoFocus={autoFocus}
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onKeyUp={handleSubmit}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </InputContainer>
      <SuggestionsContainer>
        { suggestions?.map( (entry, index) => 
          <SuggestionItem key={index}>
            <Icon>
              { isSearchHistory(entry.title) &&
                <img src="/clock.svg" alt="search" />
              }
              { !isSearchHistory(entry.title) &&
                <img src="/search.svg" alt="search" />
              }
            </Icon>
            <SuggestionTitle onMouseDown={() => handleSelect(entry.title)}>
              {entry.title}
            </SuggestionTitle>
            { isSearchHistory(entry.title) && 
              <SuggestionRemoveButton onMouseDown={() => handleRemove(entry.title)}>
                remove
              </SuggestionRemoveButton>
            }
          </SuggestionItem>
        )}
      </SuggestionsContainer>
    </Container>
  );
};

const useAutoComplete = ({ query }) => {
  const inputRef = useRef(null)
  const [inputValue, setInputValue] = useState(query);
  const suggestionsMap = useRef(new Map());
  const [cookies, setCookie] = useCookies(['searchHistory']);
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  
  const getSearchHistory = useCallback(() => {
    const cookie = cookies.searchHistory
    return cookie?.length ? cookie : [];
  }, [cookies]);
  
  const addSearchHistory = useCallback((value) => {
    const cookie = getSearchHistory();
    !cookie.find((h) => h === value) && cookie.push(value);
    setCookie('searchHistory', cookie, {path: '/'});
  }, [setCookie, getSearchHistory]);
  
  const removeSearchHistory = useCallback((value) => {
    let cookie = getSearchHistory();
    cookie = cookie.filter((h) => h !== value);
    setCookie('searchHistory', cookie, {path: '/'});
  }, [setCookie, getSearchHistory]);
  
  const isSearchHistory = (title) => getSearchHistory().find((h) => h === title);

  const retrieveSuggestions = useCallback((value) => {
    const q = value?.trim();
    const cache = suggestionsMap.current.get(q);
    if (cache) {
      setSuggestions(cache);
    } else {
      const response = doSearch(q, 1);
      suggestionsMap.current.set(q, response.results);
      setSuggestions(response.results);
    }
  }, []);
  
  const handleChange = useCallback(({ target: { value } }) => {
    setInputValue(value);
    retrieveSuggestions(value);
  }, [retrieveSuggestions]);
  
  const handleSubmit = useCallback(({ key, target: { value } }) => {
    const q = value?.trim();
    if (key === "Enter" && q) {
      inputRef.current.blur();
      addSearchHistory(q);
      navigate(`/search?q=${q}`);
    }
  }, [navigate, addSearchHistory]);
  
  const handleSelect = useCallback((value) => {
    if (value) {
      setInputValue(value);
      setSuggestions([]);
      addSearchHistory(value);
      navigate(`/search?q=${value}`);
    }
  }, [navigate, addSearchHistory]);
  
  const handleRemove = useCallback((value) => {
    value && removeSearchHistory(value);
  }, [removeSearchHistory]);
  
  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setFocused(false);
    setSuggestions([]);
  }, []);

  useEffect(() => {
    focused && retrieveSuggestions(inputValue);
  }, [inputValue, focused, retrieveSuggestions]);

  return {
    inputRef,
    inputValue,
    isSearchHistory,
    suggestions,
    handleChange,
    handleSubmit,
    handleSelect,
    handleRemove,
    handleFocus,
    handleBlur,
  };
};

export default AutoComplete;