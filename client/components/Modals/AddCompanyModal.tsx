import { FC, FormEvent, useState } from 'react'
import Modal from '@client/components/Common/Modal'
import Input from '@client/components/Common/Input'
import { AddCompanyFormData } from '@client/types/CommonTypes'
import { ADD_COMPANY_FORM_DEFAULT_DATA } from '@client/constants'
import styled, { keyframes } from 'styled-components'
import theme from '@client/styles/theme'
import Button from '@client/components/Common/Button'
import SelectInput from '@client/components/Common/SelectInput'
import { Spinner3 } from 'styled-icons/evil'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
`

const StyledTitle = styled.div`
  h3 {
    margin-bottom: 10px;
  }

  span {
    color: ${theme.colors.textDark};
  }
`

const StyledBtnsWrapper = styled.div`
  display: flex;
  margin-top: 50px;
  justify-content: flex-end;
  column-gap: 20px;
  align-items: center;
`

type Props = {
  open: boolean
  onClose: () => void
  sectors: string[]
  stages: string[]
  onSubmit: (data: AddCompanyFormData) => void
  loading: boolean
}

const AddCompanyModal: FC<Props> = ({ open, onClose, stages, sectors, onSubmit, loading }) => {
  const [formData, setFormData] = useState<AddCompanyFormData>({ ...ADD_COMPANY_FORM_DEFAULT_DATA })

  const handleFormChange = (key: keyof AddCompanyFormData, value: string | number) => {
    setFormData({ ...formData, [key]: value })
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    onSubmit(formData)
  }

  return (
    <Modal
      visible={open}
      title={
        <StyledTitle>
          <h3>Add new company</h3>
          <span>
            Add new company by filling all the required fields, select from lists and be carefull, because integer is
            limited and not everyone can handle that
          </span>
        </StyledTitle>
      }
    >
      <StyledForm onSubmit={handleFormSubmit}>
        <Input label="Company name" onChange={(value) => handleFormChange('name', value)} placeholder="Company name" />
        <SelectInput label="Stage" options={stages} onChange={(value) => handleFormChange('stage', value)} />
        <SelectInput label="Sector" options={sectors} onChange={(value) => handleFormChange('sector', value)} />
        <Input
          type="number"
          label="Investment size"
          onChange={(value) => handleFormChange('investmentSize', Number(value))}
          suffix="EUR"
        />

        <StyledBtnsWrapper>
          <Button flat onClick={onClose}>
            Cancel
          </Button>
          <Button htmlType="submit" type="primary" loading={loading}>
            Add company
          </Button>
        </StyledBtnsWrapper>
      </StyledForm>
    </Modal>
  )
}

export default AddCompanyModal
