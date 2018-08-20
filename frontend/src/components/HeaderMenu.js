import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Menu, Header, Image, Button, Modal, Form } from 'semantic-ui-react'


class HeaderMenu extends Component {
  state = { newPostModalOpen: false }

  handleItemClick = (e, obj) => this.props.onChangeOrder(obj.name)
  openNewPostModal = () => this.setState(() => ({ newPostModalOpen: true }))
  closeNewPostModal = () => this.setState(() => ({ newPostModalOpen: false }))


  render() {
    const { categories, sortOrder } = this.props
    const { newPostModalOpen } = this.state
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
                  <Form>
                    <Form.Field>
                      <label>Título</label>
                      <input placeholder='Título' />
                    </Form.Field>
                    <Form.Field>
                      <label>Autor</label>
                      <input placeholder='Autor:' />
                    </Form.Field>
                    <Form.TextArea label='Corpo' placeholder='Corpo' />
                    <Form.Select fluid label='Categoria' options={options} placeholder='Escolha uma categoria' />
                    <Button type='submit' primary onClick={ this.closeNewPostModal }>Criar</Button>
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
