import { FC } from 'react'
import styled from 'styled-components'
import { Sector } from '@client/types/SectorTypes'
import SectorItem from '@client/components/Sector/SectorItem'

const StyledWrapper = styled.div``

const StyledSectorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`

type Props = {
  companies: Sector[]
  onClick: (company: Sector) => void
  selectedSector: Sector | null
}

export const Sectors: FC<Props> = ({ companies, onClick, selectedSector }) => (
  <StyledWrapper>
    <h3>Companies by sectors</h3>

    <StyledSectorGrid>
      {companies.map((company, i) => (
        <SectorItem
          key={i}
          sector={company}
          onClick={() => onClick(company)}
          selected={selectedSector?.label === company.label}
        />
      ))}
    </StyledSectorGrid>
  </StyledWrapper>
)
