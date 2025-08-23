import { createGlobalStyle } from 'styled-components';
import { Theme } from './themes'; // Import our Theme interface

// Define the props for our GlobalStyles, which will include the theme
interface GlobalStyleProps {
  theme: Theme;
}

// Use the generic parameter to type the props
export const GlobalStyles = createGlobalStyle<GlobalStyleProps>`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    font-family: sans-serif;
    transition: all 0.50s linear;
  }
`;