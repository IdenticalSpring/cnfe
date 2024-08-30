import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from '../styles/theme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Roboto, sans-serif;
    *, *::before, *::after {
  box-sizing: border-box;
}
  
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
