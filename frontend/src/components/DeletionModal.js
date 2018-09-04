import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon, Modal, Header } from 'semantic-ui-react'

const DeletionModal = (props) => {
	const { modalOpen, modalBody, onCancel, onConfirm } = props

  return (
    <Modal open={ modalOpen }>
      <Header icon='attention' content='Atenção!' />
      <Modal.Content>
        <h4>{ modalBody }</h4>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={ onCancel }>
          <Icon name='remove' /> Não
        </Button>
        <Button color='green' onClick={ onConfirm }>
          <Icon name='checkmark' /> Sim
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
