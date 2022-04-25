import { FC } from 'react'
import { Sector } from '@client/types/SectorTypes'
import styled from 'styled-components'
import theme from '@client/styles/theme'

const StyledSector = styled.div<{ selected: boolean }>`
  padding: 30px 20px;
  background-color: ${({ selected }) => (selected ? theme.colors.lightBgHover : theme.colors.lightBg)};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  transition: all 0.25s ease-in-out;
  cursor: pointer;

  :hover {
    background-color: ${theme.colors.lightBgHover};
  }
`

const StyledSectorInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 5px;
`

const StyledSectorInfoTotal = styled.div`
  font-size: ${theme.textSizes.big}px;
  font-weight: bold;
`

const StyledSectorInfoName = styled.div`
  font-size: ${theme.textSizes.small}px;
  color: ${theme.colors.textDark};
`

const StyledSectorImg = styled.img`
  width: 50px;
  height: auto;
`

type Props = {
  sector: Sector
  onClick: () => void
  selected: boolean
}

const SectorItem: FC<Props> = ({ sector, onClick, selected }) => (
  <StyledSector selected={selected} onClick={onClick}>
    <StyledSectorInfo>
      <StyledSectorInfoTotal>{sector.total}</StyledSectorInfoTotal>

      <StyledSectorInfoName>{sector.label}</StyledSectorInfoName>
    </StyledSectorInfo>

    <StyledSectorImg src={sector.imgPath} />
  </StyledSector>
)

export default SectorItem
