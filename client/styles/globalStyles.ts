import { createGlobalStyle } from 'styled-components'
import theme from '@client/styles/theme'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    color: ${theme.colors.text};
    font-size: ${theme.textSizes.normal}px;
    font-family: 'Be Vietnam Pro', sans-serif;
    background-color: ${theme.colors.bg};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h3 {
    font-size: 20px;
    margin: 0 0 20px 0;
  }
`

export default GlobalStyles
