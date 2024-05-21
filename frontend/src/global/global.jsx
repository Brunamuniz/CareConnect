
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    
  }
  img {
      width: 100%;
      height: 600px;
    }
  p {
    font-family: "Kanit", sans-serif;
  }

  h1, h2, h3, h4, h5, h6, label, button {
    font-family: "Mohave", sans-serif;
  }
  button {
    cursor: pointer;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function Global() {
  return (
    <>
      <GlobalStyle />
    </>
  );
}

export default Global