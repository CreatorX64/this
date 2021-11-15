import styled, { createGlobalStyle } from "styled-components";
import bgImage from "./images/nattu-adnan.jpg";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  
  html {
    height: 100%;
  }

  body {
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Catamaran", sans-serif;
    line-height: 1.6;
    background-image: url(${bgImage});
    background-size: cover;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > p {
    color: #fff;
  }

  .score {
    margin: 0;
    font-size: 2rem;
    color: #fff;
  }

  h1 {
    margin: 20px;
    font-size: 70px;
    font-family: "Fascinate Inline", sans-serif;
    text-align: center;
    color: transparent;
    background-image: linear-gradient(180deg, #fff, #87f1ff);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    filter: drop-shadow(2px 2px #0085a3);
  }

  .start,
  .next {
    height: 40px;
    margin: 20px 0;
    padding: 0 40px;
    border: 2px solid #d38558;
    border-radius: 10px;
    cursor: pointer;
    background: linear-gradient(180deg, #fff, #ffcc91);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  }

  .start {
    max-width: 200px;
  }
`;
