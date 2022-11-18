import { rgba, normalize } from "polished";
import { createGlobalStyle } from 'styled-components'

export const theme = {
  boxShadow: `${rgba("#000", 0.1)} 0 2px 5px`,
  borderColor: rgba("#969696", 0.4),
  descriptionColor: rgba(0, 0, 0, 0.6),
};

export const GlobalStyle = createGlobalStyle`
  ${normalize()}
  body {
    font-family: Manrope, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.39;
    position: relative;
    min-height: 100vh;
    color: rgba(0,0,0,0.9)
  }
  * {
    box-sizing: border-box;
  }
`;