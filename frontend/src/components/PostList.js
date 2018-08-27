import React, { Component } from 'react';
import { connect } from 'react-redux'
import { removePost } from '../actions'
import { Grid, Segment, Button, Icon, Menu, Modal, Header, Label } from 'semantic-ui-react'
import { formatData } from '../utils/helpers'
import sortBy from 'sort-by'

class PostList extends Component {
  state = {
    modalOpen: false,
    postToDelete: {}
  }

  openDeleteModal = (post) => this.setState(() => ({ modalOpen: true, postToDelete: post }))
  closeDeleteModal = () => this.setState(() => ({ modalOpen: false, postToDelete: {} }))

  handleModalAction = () => {
    this.props.removePost(this.state.postToDelete)
    this.closeDeleteModal()
  }


  render() {
    const { posts, sortOrder, selectedCategory } = this.props
    const { modalOpen } = this.state

    const sortedPosts = (selectedCategory === 'all'
    ? posts.filter(p => p.hasOwnProperty('id'))
    : posts.filter(p => p.category === selectedCategory))
    .sort(sortBy('-' + sortOrder))
    // TODO: Adicionar link para abrir view de detalhes
    // TODO: Adicionar link para trocar categoria
    // TODO: Mover botão de deleção para detalhes da postagem

    return (
      <Grid.Column>
        {sortedPosts.length ? sortedPosts.map(p => (
          <Segment key={p.id} style={{ padding: '2em' }}>
            <Grid.Column>
            <h1>{p.title}</h1>
            Data: <b>{formatData(p.timestamp)}</b> - Autor: <b>{p.author}</b> - Categoria: <b>{p.category}</b>
            </Grid.Column>
            <Menu secondary>
              <Menu.Item name='post_menu' position='left'>
                <Label>
                  <Icon name='thumbs up' /> {p.voteScore}
                </Label>
                <Label>
                  <Icon name='comments' /> {p.commentCount}
                </Label>
              </Menu.Item>
              <Menu.Item name='post_menu' position='right'>
                <Button animated='vertical' color='red' onClick={ () => this.openDeleteModal(p) }>
                  <Button.Content hidden>Apagar</Button.Content>
                  <Button.Content visible>
                    <Icon name='trash' />
                  </Button.Content>
                </Button>
              </Menu.Item>
            </Menu>
          </Segment>
        )) : (
          <Segment style={{ padding: '2em' }}><h3>Nenhum post encontrado.</h3></Segment>
        )}

        <Modal
          open={ modalOpen }
          onClose={ this.closeDeleteModal }
        >
          <Header icon='attention' content='Atenção!' />
          <Modal.Content>
            <h4>
              Deseja apagar o post selecionado?
            </h4>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={ this.closeDeleteModal }>
              <Icon name='remove' /> Não
            </Button>
            <Button color='green' onClick={ this.handleModalAction }>
              <Icon name='checkmark' /> Sim
            </Button>
          </Modal.Actions>
        </Modal>
      </Grid.Column>
    )
  }
}

function mapStateToProps ({ posts, selectedCategory, sortOrder }) {
  return { posts, selectedCategory, sortOrder }
}

function mapDispatchToProps (dispatch) {
  return {
    removePost: (data) => dispatch(removePost(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostList)
