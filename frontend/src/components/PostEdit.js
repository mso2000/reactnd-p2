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
    const {isNewPost, post, onChangePost, history} = this.props
    const formValues = serializeForm(e.target, { hash: true })

    formValues.category = this.state.category.length ?
      this.state.category : (post ? post.category : '')

    formValues.title = formValues.hasOwnProperty('title') ? formValues.title : ''
    formValues.author = formValues.hasOwnProperty('author') ? formValues.author : ''
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
        closeIcon
      >
        <Header icon='archive' content={isNewPost ? 'Criar um novo post' : 'Editar post'} />
        <Modal.Content image>
          <Modal.Description>
            <Form onSubmit={this.handleSubmit}>
              { formIsInvalid && !title.length ? (
                <Form.Input error name='title' label='Título' placeholder='title' onChange={this.handleFormInputChange} />
              ) : (
                <Form.Input name='title' label='Título' placeholder='title' defaultValue={isNewPost ? '' : post.title} />
              )}
              { formIsInvalid && !author.length ? (
                <Form.Input error name='author' label='Autor' placeholder='Autor' onChange={this.handleFormInputChange} />
              ) : (
                <Form.Input name='author' label='Autor' placeholder='Autor' defaultValue={isNewPost ? '' : post.author} />
              )}
              { formIsInvalid && !body.length ? (
                <Form.TextArea error name='body' label='Corpo' placeholder='Corpo' onChange={this.handleFormInputChange} />
              ) : (
                <Form.TextArea name='body' label='Corpo' placeholder='Corpo' defaultValue={isNewPost ? '' : post.body} />
              )}
              { formIsInvalid && !category.length ? (
                <Form.Select error fluid label='Categoria' options={options} placeholder='Escolha uma categoria' onChange={ this.handleFormCategoryChange }/>
              ) : (
                <Form.Select fluid label='Categoria' options={options} placeholder='Escolha uma categoria' onChange={ this.handleFormCategoryChange } defaultValue={isNewPost ? '' : post.category}/>
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
