import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchData, removePost } from '../actions'
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
    const { posts, sortOrder, match, fetchData } = this.props
    const { modalOpen } = this.state

    const sortedPosts = (match.url === '/'
    ? posts.filter(p => p.hasOwnProperty('id'))
    : posts.filter(p => '/' + p.category === match.url))
    .sort(sortBy('-' + sortOrder))
    // TODO: Mover botão de deleção para detalhes da postagem
    // TODO: Adicionar botões de voto e edição do post

    return (
      <Grid.Column>
        {sortedPosts.length ? sortedPosts.map(p => (
          <Segment key={p.id} style={{ padding: '2em' }}>
            <Grid.Column>
              <h1>
                <Link to={`/${p.category}/${p.id}`}>{p.title}</Link>
              </h1>
              Data: <b>{formatData(p.timestamp)}</b> -
              Autor: <b>{p.author}</b> -
              Categoria:
              <Link to={'/' + p.category} onClick={fetchData}>
                <b> {p.category}</b>
              </Link>
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

function mapStateToProps ({ posts, sortOrder }) {
  return { posts, sortOrder }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => dispatch(fetchData()),
    removePost: (data) => dispatch(removePost(data))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList))
