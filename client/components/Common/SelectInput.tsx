import { FC, useRef, useState } from 'react'
import styled from 'styled-components'
import { KeyboardArrowUp } from '@styled-icons/material'
import useClickOutside from '@client/hooks/useClickOutside'
import theme from '@client/styles/theme'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const StyledSelect = styled.div`
  flex-grow: 1;
  align-items: center;
  height: 30px;
  background-color: transparent;
  border: 1px solid ${theme.colors.inputBorder};
  padding-block: 5px;
  padding-inline: 15px 5px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`

const StyledLabel = styled.label`
  padding-bottom: 5px;
`

const StyledOptionWrapper = styled.div<{ open: boolean }>`
  position: absolute;
  bottom: -10px;
  background-color: ${theme.colors.selectOptionBg};
  padding-block: 20px;
  z-index: 500;
  left: 0;
  width: 100%;
  transform: translateY(100%);
  box-shadow: 0 0 20px 0 rgb(0 0 0 / 20%);
  transition: all 0.25s ease;
  display: ${(props) => (props.open ? 'block' : 'none')};

  &:before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    z-index: 500;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: 8px solid white;
  }
`

const StyledOption = styled.div<{ selected: boolean }>`
  background-color: ${(props) => (props.selected ? theme.colors.selectOptionSelectedBg : theme.colors.selectOptionBg)};
  padding: 10.5px 20px;
  cursor: pointer;
  position: relative;

  &:hover {
    background-color: ${theme.colors.selectOptionSelectedBg};
  }
`

type Props = {
  label: string
  options: string[]
  onChange: (value: string) => void
}

const SelectInput: FC<Props> = ({ onChange, label, options }) => {
  const ref = useRef<any>(null)
  const [value, setValue] = useState('')
  const [openOptions, setOpenOptions] = useState(false)

  const handleClick = (value: boolean) => {
    setOpenOptions(value)
  }

  const handleInputChange = (inputValue: string) => {
    setOpenOptions(false)
    setValue(inputValue)

    onChange(inputValue)
  }

  useClickOutside(ref, () => handleClick(false))

  return (
    <StyledWrapper ref={ref}>
      <StyledLabel>{label}</StyledLabel>

      <StyledSelect onClick={() => handleClick(!openOptions)}>
        <span>{value}</span>
        <KeyboardArrowUp
          size={20}
          style={{ transition: 'all 0.25s ease', transform: `rotate(${openOptions ? '180deg' : '0deg'})` }}
        />
      </StyledSelect>

      <StyledOptionWrapper open={openOptions}>
        {options.map((item, i) => (
          <StyledOption key={item} selected={item === value} onClick={() => handleInputChange(item)}>
            {item}
          </StyledOption>
        ))}
      </StyledOptionWrapper>
    </StyledWrapper>
  )
}

export default SelectInput
