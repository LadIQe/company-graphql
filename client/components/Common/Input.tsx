import { FC } from 'react'
import styled from 'styled-components'
import theme from '@client/styles/theme'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledLabel = styled.label`
  padding-bottom: 5px;
`

const StyledBaseInput = styled.input`
  background-color: transparent;
  border-radius: 5px;
  padding-block: 5px;
  padding-left: 15px;
  flex-grow: 1;
  height: 30px;
  color: ${theme.colors.text};
`

const StyledInputSuffix = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  input {
    padding-right: 60px;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  div {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
`

const StyledInput = styled(StyledBaseInput)`
  border: 1px solid ${theme.colors.inputBorder};
`

type Props = {
  label: string
  type?: 'text' | 'number'
  placeholder?: string
  onChange: (value: string | number) => void
  suffix?: string | JSX.Element
}

const Input: FC<Props> = ({ label, onChange, type = 'text', placeholder, suffix }) => (
  <StyledWrapper>
    <StyledLabel>{label}</StyledLabel>

    {suffix ? (
      <StyledInputSuffix>
        <StyledInput placeholder={placeholder} type={type} onChange={(e) => onChange(e.target.value)} />
        <div>{suffix}</div>
      </StyledInputSuffix>
    ) : (
      <StyledInput placeholder={placeholder} type={type} onChange={(e) => onChange(e.target.value)} />
    )}
  </StyledWrapper>
)

export default Input
