import { useMutation, useQuery } from '@apollo/client'
import styled from 'styled-components'
import { GET_COMPANIES, CompanyType, GET_SECTORS, GET_STAGES, ADD_COMPANY } from '@client/api/graphql'
import { Sectors } from '@client/components/Sector/Sectors'
import { Sector } from '@client/types/SectorTypes'
import Table from '@client/components/Table/Table'
import DonutGraph from '@client/components/Graph/DonutGraph'
import { useState } from 'react'
import Button from '@client/components/Common/Button'
import AddCompanyModal from '@client/components/Modals/AddCompanyModal'
import { AddCompanyFormData } from '@client/types/CommonTypes'

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  row-gap: 40px;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;
`

const LoadingDiv = styled.div`
  text-align: center;
`

const StyledButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

export function Page() {
  const [open, setOpen] = useState(false)
  const [companyFilter, setCompanyFilter] = useState<Sector | null>(null)

  const { loading, error, data } = useQuery<{ companies: CompanyType[] }>(GET_COMPANIES)
  const { loading: sectorLoading, error: sectorError, data: sectorData } = useQuery<{ sectors: string[] }>(GET_SECTORS)
  const { data: stageData } = useQuery<{ stages: string[] }>(GET_STAGES)
  const [mutationFunction, { loading: submittingNewCompany }] = useMutation(ADD_COMPANY, {
    onCompleted: () => setOpen(false),
    refetchQueries: [GET_COMPANIES, 'getCompanies']
  })

  console.log(submittingNewCompany)

  if (loading && sectorLoading) {
    return <LoadingDiv>Loading data...</LoadingDiv>
  }

  if (error || sectorError) {
    return (
      <span>
        <pre>{JSON.stringify(error || sectorError, null, 2)}</pre>
      </span>
    )
  }

  const companySectors: Sector[] =
    sectorData?.sectors.map((sector) => ({
      label: sector,
      imgPath: `../../assets/${sector.toLowerCase()}.svg`,
      total: data?.companies.filter((company) => company.sector === sector).length || 0
    })) || []

  const companies = companyFilter
    ? data?.companies.filter((item) => item.sector === companyFilter.label) || []
    : data?.companies || []

  const handleSectorClick = (sector: Sector) => {
    setCompanyFilter(sector.label === companyFilter?.label ? null : sector)
  }

  const handleOnSubmit = async (data: AddCompanyFormData) => {
    await mutationFunction({ variables: data })
  }

  return (
    <Container>
      <Sectors companies={companySectors} onClick={handleSectorClick} selectedSector={companyFilter} />
      <DonutGraph companies={companies} />
      <Table companies={companies} />
      <StyledButtonWrapper>
        <Button type="primary" onClick={() => setOpen(true)}>
          Add new company
        </Button>
      </StyledButtonWrapper>
      <AddCompanyModal
        open={open}
        onClose={() => setOpen(false)}
        sectors={sectorData?.sectors || []}
        stages={stageData?.stages || []}
        onSubmit={handleOnSubmit}
        loading={submittingNewCompany}
      />
    </Container>
  )
}

export default Page
