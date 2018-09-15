import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Modal, Header } from 'semantic-ui-react'

import {
	MODAL_DELETE_TITLE,
  MODAL_DELETE_BUTTON_CANCEL,
  MODAL_DELETE_BUTTON_CONFIRM
} from '../utils/constants.js'

/**
 * Modal de uso genérico para deleção de posts ou comentários
 */
const DeletionModal = (props) => {
	const { modalOpen, modalBody, onCancel, onConfirm } = props

  return (
    <Modal open={ modalOpen }>
      <Header icon='attention' content={ MODAL_DELETE_TITLE } />
      <Modal.Content>
        <h4>{ modalBody }</h4>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={ onCancel }>
          <Icon name='remove' /> {MODAL_DELETE_BUTTON_CANCEL}
        </Button>
        <Button color='green' onClick={ onConfirm }>
          <Icon name='checkmark' /> {MODAL_DELETE_BUTTON_CONFIRM}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

DeletionModal.propTypes = {
	modalBody: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
}

export default DeletionModal
