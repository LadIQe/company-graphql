import { FC } from 'react'
import styled from 'styled-components'
import { createPortal } from 'react-dom'
import theme from '@client/styles/theme'

const StyledWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledModalMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${theme.colors.modalMask};
  opacity: 0.9;
`

const StyledModal = styled.div`
  width: 800px;
  z-index: 1;
`

const StyledModalHeader = styled.div`
  padding: 20px 30px;
  background-color: ${theme.colors.modalHeaderBg};
`

const StyledModalBody = styled.div`
  padding: 20px 30px;
  background-color: ${theme.colors.modalBodyBg};
`

type Props = {
  visible: boolean
  title: string | JSX.Element
}

const Modal: FC<Props> = ({ visible, children, title }) => {
  const createPortalMountedDiv = () => {
    const mountedEl = document.getElementById('modal-root')

    if (mountedEl) return mountedEl

    const el = document.createElement('div')
    el.id = 'modal-root'

    document.body.appendChild(el)

    return el
  }

  return visible
    ? createPortal(
        <StyledWrapper>
          <StyledModalMask />
          <StyledModal>
            <StyledModalHeader>{title}</StyledModalHeader>

            <StyledModalBody>{children}</StyledModalBody>
          </StyledModal>
        </StyledWrapper>,
        createPortalMountedDiv()
      )
    : null
}

export default Modal
