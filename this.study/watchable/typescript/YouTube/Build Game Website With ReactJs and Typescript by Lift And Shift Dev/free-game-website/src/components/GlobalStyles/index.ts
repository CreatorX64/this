import { createGlobalStyle } from "styled-components";
import { fontFamily } from "styles/fonts";
import { primaryColor } from "styles/theme";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    height: 100%;
  }

  body {
    box-sizing: border-box;
    height: 100%;
    margin: 0;
    font-family: ${fontFamily};
    line-height: 1.5;
    background-color: ${primaryColor}
  }
`;
