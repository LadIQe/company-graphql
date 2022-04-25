import { ApolloProvider } from '@apollo/client'
import styled, { ThemeProvider } from 'styled-components'
import theme from '@client/styles/theme'
import { ReactComponent as LogoSvg } from '@assets/vestberry-logo.svg'

import client from '@client/api/apollo'
import Page from '@client/pages/Page'
import GlobalStyles from './styles/globalStyles'

const Logo = styled(LogoSvg)`
  height: 10px;
`

const Header = styled.header`
  padding: 20px;
`

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Header>
            <Logo />
          </Header>
          <Page />
        </ThemeProvider>
      </ApolloProvider>
    </div>
  )
}

export default App
