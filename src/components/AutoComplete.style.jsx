import styled from "styled-components";

export const Container = styled.div`
  min-height: 50px;
  width: 500px;
  border-radius: 32px;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.borderColor};
  box-shadow: ${({ theme }) => theme.boxShadow};
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
`;

export const InputField = styled.input`
  margin-right: 12px;
  width: 100%;
  height: 32px;
  border: none;
  :focus {
    outline: none;
  }
`;

export const Icon = styled.span`
  height: 24px;
  line-height: 24px;
  width: 24px;
  margin: 6px 12px 0 16px;
`;

export const SuggestionsContainer = styled.div`
`;

export const SuggestionItem = styled.div`
  padding: 0 0 5px 0;
  display: flex;
  align-items: center;
  justify-content: start;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.borderColor};
  }
`;

export const SuggestionTitle = styled.span`
`;

export const SuggestionRemoveButton = styled.span`
  right: 15px;
  position: absolute;
`;
