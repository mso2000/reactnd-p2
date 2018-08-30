import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchData, removePost, updatePost, votePost } from '../actions'
import { Grid, Segment, Button, Icon, Menu, Modal, Header, Label } from 'semantic-ui-react'
import PostEdit from './PostEdit'
import { formatData } from '../utils/helpers'
import sortBy from 'sort-by'

class PostList extends Component {
  state = {
    editModalOpen: false,
    deleteModalOpen: false,
    selectedPost: {}
  }

  openEditPostModal = (post) => this.setState(() => ({ editModalOpen: true, selectedPost: post }))
  closeEditPostModal = () => this.setState(() => ({ editModalOpen: false, selectedPost: {} }))

  openDeleteModal = (post) => this.setState(() => ({ deleteModalOpen: true, selectedPost: post }))
  closeDeleteModal = () => this.setState(() => ({ deleteModalOpen: false, selectedPost: {} }))

  updatePost = (newPost) => this.props.updatePost(this.state.selectedPost, newPost)

  handleModalAction = () => {
    this.props.removePost(this.state.selectedPost)
    this.closeDeleteModal()
  }

  render() {
    const { posts, sortOrder, match, fetchData, votePost } = this.props
    const { editModalOpen, deleteModalOpen, selectedPost } = this.state

    const sortedPosts = (match.url === '/'
    ? posts.filter(p => p.hasOwnProperty('id'))
    : posts.filter(p => '/' + p.category === match.url))
    .sort(sortBy('-' + sortOrder))

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
              <Button.Group size='mini' floated='right'>
                <Button animated='vertical' onClick={ () => votePost(p, 'upVote') }>
                  <Button.Content hidden>+1</Button.Content>
                  <Button.Content visible>
                    <Icon name='thumbs up' />
                  </Button.Content>
                </Button>
                <Button animated='vertical' onClick={ () => votePost(p, 'downVote') }>
                  <Button.Content hidden>-1</Button.Content>
                  <Button.Content visible>
                    <Icon name='thumbs down' />
                  </Button.Content>
                </Button>
              </Button.Group>&nbsp;&nbsp;
              <Button.Group size='mini' floated='right'>
                <Button animated='vertical' color='green' onClick={ () => this.openEditPostModal(p) }>
                  <Button.Content hidden>Editar</Button.Content>
                  <Button.Content visible>
                    <Icon name='edit' />
                  </Button.Content>
                </Button>
                <Button animated='vertical' color='red' onClick={ () => this.openDeleteModal(p) }>
                  <Button.Content hidden>Apagar</Button.Content>
                  <Button.Content visible>
                    <Icon name='trash' />
                  </Button.Content>
                </Button>
              </Button.Group>
            </Menu>
          </Segment>
        )) : (
          <Segment style={{ padding: '2em' }}><h3>Nenhum post encontrado.</h3></Segment>
        )}

        <PostEdit
          modalOpen={ editModalOpen }
          onCloseModal={ this.closeEditPostModal }
          isNewPost={ false }
          post={ selectedPost }
          onChangePost={ this.updatePost }
        />

        <Modal
          open={ deleteModalOpen }
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
    removePost: (data) => dispatch(removePost(data)),
    updatePost: (oldPost, newPost) => dispatch(updatePost(oldPost, newPost)),
    votePost: (post, option) => dispatch(votePost(post, option))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList))
