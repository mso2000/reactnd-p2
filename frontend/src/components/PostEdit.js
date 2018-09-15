import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Header, Modal, Form, Divider } from 'semantic-ui-react'
import serializeForm from 'form-serialize'
import PropTypes from 'prop-types'

import {
  MODAL_POST_LABEL_NEW,
  MODAL_POST_LABEL_EDIT,
  MODAL_POST_INPUT_TITLE,
  MODAL_POST_INPUT_AUTHOR,
  MODAL_POST_INPUT_BODY,
  MODAL_POST_INPUT_CATEGORY,
  MODAL_POST_CATEGORY_NONE,
  MODAL_POST_BUTTON_LABEL
} from '../utils/constants.js'

/**
 * Exibe o Modal para criação/edição de um post
 */
export class PostEdit extends Component {
  state = {
    formIsInvalid: false,
    category: '',
    title: '',
    author: '',
    body: ''
  }

  handleFormCategoryChange = (e, {value}) => this.setState({ category: value })
  handleFormInputChange = (e, {name, value}) => this.setState({ [name]: value })
  closeModal = () => {
    this.props.onCloseModal()
    this.setState(
      {
        formIsInvalid: false,
        category: '',
        title: '',
        author: '',
        body: ''
      }
    )
  }

  /**
   * Para o envio do formulário, é necessário que o título, autor e corpo do
   * post estejam presentes, assim como a categoria selecionada
   *
   * Em caso positivo, são adicionados:
   * - um UUID para o post
   * - o timestamp atual
   * - outros dados padrão de um novo post
   *
   * OBS: Se for a edição de um post existente, apenas o timestamp é
   * atualizado
   *
   * Após, o Modal é fechado enviando os dados a serem inseridos/editados para o
   * componente pai e o app redireciona para os detalhes do post em questão.
   *
   * Em caso negativo, o formulário é marcado como inválido e os campos em branco
   * ganham destaque na UI.
   */
  handleSubmit = (e) => {
    e.preventDefault()
    const {isNewPost, post, onChangePost, history} = this.props
    const formValues = serializeForm(e.target, { hash: true })

    formValues.category = this.state.category.length ?
      this.state.category : (post.length ? post.category : '')

    formValues.title = formValues.hasOwnProperty('title') ?
      formValues.title : ''
    formValues.author = formValues.hasOwnProperty('author') ?
      formValues.author : ''
    formValues.body = formValues.hasOwnProperty('body') ? formValues.body : ''

    const formIsInvalid = !(formValues.title.length
      && formValues.author.length
      && formValues.body.length
      && formValues.category.length)

    if(!formIsInvalid){
      let id
      let extraValues

      if(isNewPost){
        const uuidv4 = require('uuid/v4');
        id = uuidv4()
        extraValues = {
          id,
          voteScore: 1,
      		deleted: false,
      		commentCount: 0
        }
      } else {
        id = post.id
        extraValues = {
          id,
          voteScore: post.voteScore,
      		deleted:  post.deleted,
      		commentCount: post.commentCount
        }
      }

      onChangePost({...formValues, ...extraValues, timestamp: Date.now() })

      this.closeModal()

      history.push(`/${formValues.category}/${id}`)
    }

    this.setState({...formValues, formIsInvalid})
  }

  render() {
    const { modalOpen, isNewPost, post, categories } = this.props
    const { formIsInvalid, category, title, author, body } = this.state

    const options = categories.reduce((accumulator, currentValue) => {
      accumulator.push(
        {
          key: currentValue.path,
          text: currentValue.name,
          value: currentValue.path
        })
      return accumulator
    }, [])

    return (
      <Modal
        open={ modalOpen }
        onClose={ this.closeModal }
        onMount={ () => this.handleFormCategoryChange(null,
          {value: isNewPost ? '' : post.category})}
        closeIcon
      >
        <Header
          icon='archive'
          content={isNewPost ? MODAL_POST_LABEL_NEW : MODAL_POST_LABEL_EDIT}
        />
        <Modal.Content image>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
              { formIsInvalid && !title.length ? (
                <Form.Input
                  error
                  name='title'
                  label={ MODAL_POST_INPUT_TITLE }
                  placeholder={ MODAL_POST_INPUT_TITLE }
                  onChange={this.handleFormInputChange}
                />
              ) : (
                <Form.Input
                  name='title'
                  label={ MODAL_POST_INPUT_TITLE }
                  placeholder={ MODAL_POST_INPUT_TITLE }
                  defaultValue={isNewPost ? '' : post.title}
                  />
              )}
              { formIsInvalid && !author.length ? (
                <Form.Input
                  error
                  name='author'
                  label={ MODAL_POST_INPUT_AUTHOR }
                  placeholder={ MODAL_POST_INPUT_AUTHOR }
                  onChange={this.handleFormInputChange}
                />
              ) : (
                <Form.Input
                  name='author'
                  label={ MODAL_POST_INPUT_AUTHOR }
                  placeholder={ MODAL_POST_INPUT_AUTHOR }
                  defaultValue={isNewPost ? '' : post.author}
                />
              )}
              { formIsInvalid && !body.length ? (
                <Form.TextArea
                  error
                  name='body'
                  label={ MODAL_POST_INPUT_BODY }
                  placeholder={ MODAL_POST_INPUT_BODY }
                  onChange={this.handleFormInputChange}
                />
              ) : (
                <Form.TextArea
                  name='body'
                  label={ MODAL_POST_INPUT_BODY }
                  placeholder={ MODAL_POST_INPUT_BODY }
                  defaultValue={isNewPost ? '' : post.body}
                />
              )}
              { formIsInvalid && !category.length ? (
                <Form.Select
                  error
                  fluid
                  label={ MODAL_POST_INPUT_CATEGORY }
                  options={options}
                  placeholder={ MODAL_POST_CATEGORY_NONE }
                  onChange={ this.handleFormCategoryChange }
                />
              ) : (
                <Form.Select
                  fluid
                  label={ MODAL_POST_INPUT_CATEGORY }
                  options={options}
                  placeholder={ MODAL_POST_CATEGORY_NONE }
                  onChange={ this.handleFormCategoryChange }
                  defaultValue={isNewPost ? '' : post.category}
                />
              )}
              <Divider />
              <Form.Button
                primary
                floated='right'
                content={ MODAL_POST_BUTTON_LABEL }
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

function mapStateToProps ({ categories }) {
  return { categories }
}

PostEdit.propTypes = {
  categories: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  isNewPost: PropTypes.bool.isRequired,
  onChangePost: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  post: PropTypes.object.isRequired
}

export default withRouter(connect(mapStateToProps)(PostEdit))
