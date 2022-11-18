import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const Container = styled.div`
  padding: 24px;
`;

export const SubContainer = styled.div`
  padding: 24px;
  &:not(:last-of-type) {
    border-bottom: 1px solid ${({ theme }) => theme.borderColor};
  }
`;

export const AutoCompleteContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 180px;
`;

export const TitleContainer = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-weight: 600;
  padding: 0 72px 0 24px;
`;