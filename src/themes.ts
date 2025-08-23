// Define the structure of our theme object
export interface Theme {
    body: string;
    text: string;
    toggleBorder: string;
    background: string;
  }
  
  // Apply the Theme interface to our theme objects
  export const lightTheme: Theme = {
    body: '#E2E2E2',
    text: '#363537',
    toggleBorder: '#FFF',
    background: '#363537',
  };
  
  export const darkTheme: Theme = {
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    background: '#999',
  };