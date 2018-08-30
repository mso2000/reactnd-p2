import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Header, Modal, Form, Divider } from 'semantic-ui-react'
import serializeForm from 'form-serialize'

class PostEdit extends Component {
  state = {
    formIsInvalid: false,
    category: '',
    title: '',
    author: '',
    body: ''
  }
// TODO: Criar modos de operação (novo post / edição de post)

  handleFormCategoryChange = (e, { value }) => this.setState({ category: value })
  handleFormInputChange = (e, { name, value }) => this.setState({ [name]: value })
  closeModal = () => {
    this.props.onCloseModal()
    this.setState(() => ({
      formIsInvalid: false,
      category: '',
      title: '',
      author: '',
      body: ''
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const formValues = serializeForm(e.target, { hash: true })
    formValues.category = this.state.category
    formValues.title = formValues.hasOwnProperty('title') ? formValues.title : ''
    formValues.author = formValues.hasOwnProperty('author') ? formValues.author : ''
    formValues.body = formValues.hasOwnProperty('body') ? formValues.body : ''

    const formIsInvalid = !(formValues.title.length
      && formValues.author.length
      && formValues.body.length
      && formValues.category.length)

    if(!formIsInvalid){
      const uuidv4 = require('uuid/v4');
      const id = uuidv4()
      const {onAddPost, history} = this.props

      onAddPost(
        {
          ...formValues,
          id,
          timestamp: Date.now(),
          voteScore: 1,
      		deleted: false,
      		commentCount: 0
        })

      this.closeModal()
      history.push(`/${formValues.category}/${id}`)
    }

    this.setState({...formValues, formIsInvalid})
  }

  render() {
    const { modalOpen, categories } = this.props
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
        closeIcon
      >
        <Header icon='archive' content='Criar um novo post' />
        <Modal.Content image>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
              { formIsInvalid && !title.length ? (
                <Form.Input error name='title' label='Título' placeholder='title' onChange={this.handleFormInputChange} />
              ) : (
                <Form.Input name='title' label='Título' placeholder='title' />
              )}
              { formIsInvalid && !author.length ? (
                <Form.Input error name='author' label='Autor' placeholder='Autor' onChange={this.handleFormInputChange} />
              ) : (
                <Form.Input name='author' label='Autor' placeholder='Autor' />
              )}
              { formIsInvalid && !body.length ? (
                <Form.TextArea error name='body' label='Corpo' placeholder='Corpo' onChange={this.handleFormInputChange} />
              ) : (
                <Form.TextArea name='body' label='Corpo' placeholder='Corpo' />
              )}
              { formIsInvalid && !category.length ? (
                <Form.Select error fluid label='Categoria' options={options} placeholder='Escolha uma categoria' onChange={ this.handleFormCategoryChange }/>
              ) : (
                <Form.Select fluid label='Categoria' options={options} placeholder='Escolha uma categoria' onChange={ this.handleFormCategoryChange }/>
              )}
              <Divider />
              <Form.Button primary floated='right' content='Publicar' labelPosition='left' icon='edit' />
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


export default withRouter(connect(mapStateToProps)(PostEdit))
