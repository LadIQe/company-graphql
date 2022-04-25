import { FC } from 'react'
import { CompanyType } from '@client/api/graphql'
import styled from 'styled-components'
import theme from '@client/styles/theme'
import { Label, Legend, Pie, PieChart } from 'recharts'

const StyledWrapper = styled.div``

const StyledGraphWrapper = styled.div`
  height: 300px;
  background-color: ${theme.colors.lightBg};
  padding: 50px;
`

type Props = {
  companies: CompanyType[]
}

const DonutGraph: FC<Props> = ({ companies }) => {
  const data = companies.map((company) => ({
    name: company.name,
    value: company.investmentSize,
    fill: `#${Math.floor(Math.random() * 16777215).toString(16)}`
  }))

  const renderColorfulLegendText = (value: string) => {
    return <span style={{ color: theme.colors.text, fontWeight: 500, padding: '10px' }}>{value}</span>
  }

  const CustomLabel = ({ viewBox, value1, value2 }: { viewBox?: any; value1: string | number; value2: string }) => {
    return (
      <>
        <text x={viewBox?.cx} y={viewBox?.cy} fill={theme.colors.text} textAnchor="middle">
          <tspan fontSize={theme.textSizes.big}>{value1}</tspan>
        </text>

        <text x={viewBox?.cx} y={viewBox?.cy + 20} fill={theme.colors.textDark} textAnchor="middle">
          <tspan fontSize={theme.textSizes.normal}>{value2}</tspan>
        </text>
      </>
    )
  }

  return (
    <StyledWrapper>
      <h3>Companies by investment size</h3>

      <StyledGraphWrapper>
        <PieChart width={900} height={300}>
          <Legend
            iconType="circle"
            layout="vertical"
            formatter={renderColorfulLegendText}
            align="center"
            verticalAlign="middle"
          />
          <Pie
            stroke="none"
            dataKey="value"
            data={data}
            cx={140}
            cy={140}
            innerRadius={120}
            outerRadius={140}
            paddingAngle={0}
          >
            <Label
              position="center"
              content={(props) => <CustomLabel viewBox={props.viewBox} value1={companies.length} value2="companies" />}
            />
          </Pie>
        </PieChart>
      </StyledGraphWrapper>
    </StyledWrapper>
  )
}

export default DonutGraph
