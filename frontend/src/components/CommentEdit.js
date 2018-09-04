import React, { Component } from 'react';
import { Header, Modal, Form, Divider } from 'semantic-ui-react'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types';

class CommentEdit extends Component {
  state = {
    formIsInvalid: false,
    author: '',
    body: ''
  }

  handleFormInputChange = (e, {name, value}) => this.setState({ [name]: value })
  closeModal = () => {
    this.props.onCloseModal()
    this.setState(
      {
        formIsInvalid: false,
        author: '',
        body: ''
      }
    )
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { isNewComment, comment, onChangeComment } = this.props
    const formValues = serializeForm(e.target, { hash: true })

    formValues.author = formValues.hasOwnProperty('author') ? formValues.author : ''
    formValues.body = formValues.hasOwnProperty('body') ? formValues.body : ''
    formValues.parentId = comment.parentId

    const formIsInvalid = !(formValues.author.length && formValues.body.length)

    if(!formIsInvalid){
      let extraValues

      if(isNewComment){
        const uuidv4 = require('uuid/v4');
        extraValues = {
          id: uuidv4(),
          voteScore: 1,
      		deleted: false,
      		parentDeleted: false
        }
      } else {
        extraValues = {
          id: comment.id,
          voteScore: comment.voteScore,
      		deleted:  comment.deleted,
      		parentDeleted: comment.parentDeleted
        }
      }

      onChangeComment({...formValues, ...extraValues, timestamp: Date.now() })
      this.closeModal()
    }

    this.setState({...formValues, formIsInvalid})
  }

  render() {
    const { modalOpen, isNewComment, comment } = this.props
    const { formIsInvalid, author, body } = this.state

    return (
      <Modal
        open={ modalOpen }
        onClose={ this.closeModal }
        closeIcon
      >
        <Header icon='archive' content={
          isNewComment ? 'Criar um novo comentário' : 'Editar comentário'} />
        <Modal.Content image>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
              { formIsInvalid && !author.length ? (
                <Form.Input
                  error
                  name='author'
                  label='Autor'
                  placeholder='Autor'
                  onChange={this.handleFormInputChange}
                />
              ) : (
                <Form.Input
                  name='author'
                  label='Autor'
                  placeholder='Autor'
                  defaultValue={isNewComment ? '' : comment.author}
                />
              )}
              { formIsInvalid && !body.length ? (
                <Form.TextArea
                  error
                  name='body'
                  label='Corpo'
                  placeholder='Corpo'
                  onChange={this.handleFormInputChange}
                />
              ) : (
                <Form.TextArea
                  name='body'
                  label='Corpo'
                  placeholder='Corpo'
                  defaultValue={isNewComment ? '' : comment.body}
                />
              )}
              <Divider />
              <Form.Button
                primary
                floated='right'
                content='Publicar'
                labelPosition='left'
                icon='edit'
              />
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    )
  }
}

CommentEdit.propTypes = {
  comment: PropTypes.object.isRequired,
  isNewComment: PropTypes.bool.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  onChangeComment: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired
}

export default CommentEdit
