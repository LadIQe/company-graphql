import styled, { keyframes } from 'styled-components'
import theme from '@client/styles/theme'
import { FC } from 'react'
import { Spinner3 } from 'styled-icons/evil'

const StyledBaseButton = styled.button`
  height: 40px;
  cursor: pointer;
  transition: all 0.25s ease-in-out;
  border: none;
  display: flex;
  align-items: center;
  white-space: nowrap;
  column-gap: 10px;

  :hover {
    filter: brightness(110%);
  }
`
const StyledButton = styled(StyledBaseButton)`
  padding-inline: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${theme.colors.btnBg};
  color: ${theme.colors.text};
`

const StyledFlatButton = styled(StyledBaseButton)`
  padding-inline: 0;
  border-radius: 0;
  background-color: transparent;
  color: ${theme.colors.textDark};
`

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`

const StyledLoading = styled(Spinner3)`
  animation: ${rotation} 2s infinite linear;
  width: 24px;
`

type Props = {
  type?: 'primary'
  flat?: boolean
  htmlType?: 'submit' | 'button'
  onClick?: () => void
  loading?: boolean
}

const Button: FC<Props> = ({ loading, type, flat, children, ...rest }) => {
  switch (type) {
    case 'primary':
      return (
        <StyledButton {...rest}>
          {loading ? <StyledLoading /> : null}
          {children}
        </StyledButton>
      )
  }

  if (flat) {
    return (
      <StyledFlatButton {...rest}>
        {loading ? <StyledLoading /> : null}
        {children}
      </StyledFlatButton>
    )
  }

  return null
}

export default Button
