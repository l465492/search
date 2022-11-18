import styled from "styled-components";

export const MetadataContainer = styled.div`
  color: ${({ theme }) => theme.descriptionColor};
  margin-bottom: 12px;
`;

export const ResultContainer = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 24px;
  }
`;

export const ResultTitle = styled.a`
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;
`;

export const ResultDescription = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.descriptionColor};
`;

export const PaginationButton = styled.span`
  font-size: 20px;
  cursor: pointer;
  margin-left: 20px;
`;