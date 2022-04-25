import { FC } from 'react'
import { CompanyType } from '@client/api/graphql'
import styled from 'styled-components'
import theme from '@client/styles/theme'

const StyledWrapper = styled.div``

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const StyledTableTh = styled.th<{ align: string }>`
  padding: 20px;
  background-color: ${theme.colors.lightBg};
  text-align: ${(props) => props.align};
`

const StyledTableTr = styled.tr<{ odd: boolean }>`
  background-color: ${(props) => (props.odd ? theme.colors.lighterBg : 'inherit')};
`

const StyledTableTd = styled.td<{ align: string }>`
  padding: 20px;
  text-align: ${(props) => props.align};
`

type Props = {
  companies: CompanyType[]
}

const Table: FC<Props> = ({ companies }) => (
  <StyledWrapper>
    <h3>Companies overview</h3>

    <StyledTable>
      <thead>
        <tr>
          <StyledTableTh align="left">company name</StyledTableTh>
          <StyledTableTh align="right">stage</StyledTableTh>
          <StyledTableTh align="right">sector</StyledTableTh>
          <StyledTableTh align="right">investment size</StyledTableTh>
        </tr>
      </thead>
      <tbody>
        {companies?.map((company, i) => (
          <StyledTableTr key={company.id} odd={i % 2 === 1}>
            <StyledTableTd align="left">{company.name}</StyledTableTd>
            <StyledTableTd align="right">{company.stage}</StyledTableTd>
            <StyledTableTd align="right">{company.sector}</StyledTableTd>
            <StyledTableTd align="right">{company.investmentSize}</StyledTableTd>
          </StyledTableTr>
        )) ?? null}
      </tbody>
    </StyledTable>
  </StyledWrapper>
)

export default Table
