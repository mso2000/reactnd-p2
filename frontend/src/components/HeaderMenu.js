import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addNewPost, selectSortOrder } from '../actions'
import { Grid, Menu, Header, Image, Button, Modal, Form } from 'semantic-ui-react'
import serializeForm from 'form-serialize'


class HeaderMenu extends Component {
  state = {
    newPostModalOpen: false,
    formIsInvalid: false,
    category: '',
    title: '',
    author: '',
    body: ''
  }

  handleMenuItemClick = (e, obj) => this.props.selectSortOrder(obj.name)
  handleFormCategoryChange = (e, { value }) => this.setState({ category: value })
  handleFormInputChange = (e, { name, value }) => this.setState({ [name]: value })
  openNewPostModal = () => this.setState(() => ({ newPostModalOpen: true }))
  closeNewPostModal = () => this.setState(() => ({
    newPostModalOpen: false,
    formIsInvalid: false,
    category: '',
    title: '',
    author: '',
    body: ''
  }))

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
      const {addNewPost, history} = this.props

      addNewPost(
        {
          ...formValues,
          id,
          timestamp: Date.now(),
          voteScore: 1,
      		deleted: false,
      		commentCount: 0
        })

      this.closeNewPostModal()
      history.push(`/${formValues.category}/${id}`)
    }

    this.setState({...formValues, formIsInvalid})
  }


  render() {
    const { categories, sortOrder } = this.props
    const { newPostModalOpen, formIsInvalid, category, title, author, body } = this.state

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
      <Grid.Column>
        <Menu secondary>
          <Menu.Item name='logo'>
            <Header as='h2'>
              <Image circular src='/favicon.ico' /> Leitura
            </Header>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item name='sort_by'><b>Ordenar por:</b></Menu.Item>
            <Menu.Item name='timestamp' active={sortOrder === 'timestamp'} onClick={this.handleMenuItemClick}>Data</Menu.Item>
            <Menu.Item name='voteScore' active={sortOrder === 'voteScore'} onClick={this.handleMenuItemClick}>Votos</Menu.Item>
          </Menu.Menu>
          <Menu.Item name='new_post'>
            <Modal
              trigger={<Button content='Novo Post' labelPosition='left' icon='edit' primary onClick={ this.openNewPostModal } />}
              open={ newPostModalOpen }
              onClose={ this.closeNewPostModal }
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
                    <Form.Button primary content='Publicar' labelPosition='left' icon='edit' />
                  </Form>
                </Modal.Description>
              </Modal.Content>
            </Modal>
          </Menu.Item>
        </Menu>
      </Grid.Column>
    )
  }
}


function mapStateToProps ({ categories, sortOrder }) {
  return { categories, sortOrder }
}

function mapDispatchToProps (dispatch) {
  return {
    addNewPost: (data) => dispatch(addNewPost(data)),
    selectSortOrder: (data) => dispatch(selectSortOrder(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu)
