import React, { Component } from 'react';
import { connect } from 'react-redux'
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

  handleItemClick = (e, obj) => this.props.onChangeOrder(obj.name)
  openNewPostModal = () => this.setState(() => ({ newPostModalOpen: true }))
  closeNewPostModal = () => this.setState(() => ({
    newPostModalOpen: false,
    formIsInvalid: false,
    category: '',
    title: '',
    author: '',
    body: ''
  }))

  handleChange = (e, { value }) => {
    this.setState({ category: value })
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
      this.props.onAddPost(
        {
          ...formValues,
          id: uuidv4(),
          timestamp: Date.now(),
          voteScore: 1,
      		deleted: false,
      		commentCount: 0
        })
      this.closeNewPostModal()
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
            <Menu.Item name='timestamp' active={sortOrder === 'timestamp'} onClick={this.handleItemClick}>Data</Menu.Item>
            <Menu.Item name='voteScore' active={sortOrder === 'voteScore'} onClick={this.handleItemClick}>Votos</Menu.Item>
          </Menu.Menu>
          <Menu.Item name='new_post'>
            <Modal
              trigger={<Button primary onClick={ this.openNewPostModal }>Novo Post</Button>}
              open={ newPostModalOpen }
              onClose={ this.closeNewPostModal }
            >
              <Modal.Header>Criar um novo post</Modal.Header>
              <Modal.Content image>
                <Modal.Description>
                  <Form onSubmit={this.handleSubmit}>
                    { formIsInvalid && !title.length ? (
                      <Form.Input error name='title' label='Título' placeholder='title' />
                    ) : (
                      <Form.Input name='title' label='Título' placeholder='title' />
                    )}
                    { formIsInvalid && !author.length ? (
                      <Form.Input error name='author' label='Autor' placeholder='Autor' />
                    ) : (
                      <Form.Input name='author' label='Autor' placeholder='Autor' />
                    )}
                    { formIsInvalid && !body.length ? (
                      <Form.TextArea error name='body' label='Corpo' placeholder='Corpo' />
                    ) : (
                      <Form.TextArea name='body' label='Corpo' placeholder='Corpo' />
                    )}
                    { formIsInvalid && !category.length ? (
                      <Form.Select error fluid label='Categoria' options={options} placeholder='Escolha uma categoria' onChange={ this.handleChange }/>
                    ) : (
                      <Form.Select fluid label='Categoria' options={options} placeholder='Escolha uma categoria' onChange={ this.handleChange }/>
                    )}
                    <Button primary>Criar</Button>
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


function mapStateToProps ({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(HeaderMenu)
