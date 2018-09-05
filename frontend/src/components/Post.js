import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchData, removePost, updatePost, votePost } from '../actions'
import { Grid, Button, Segment, Icon, Menu, Label } from 'semantic-ui-react'
import PostEdit from './PostEdit'
import DeletionModal from './DeletionModal'
import { formatData } from '../utils/helpers'
import PropTypes from 'prop-types'

class Post extends Component {
  state = {
    editModalOpen: false,
    deleteModalOpen: false,
  }

  openEditPostModal = () => this.setState({ editModalOpen: true })
  closeEditPostModal = () => this.setState({ editModalOpen: false })

  openDeleteModal = () => this.setState({ deleteModalOpen: true })
  closeDeleteModal = () => this.setState({ deleteModalOpen: false })

  updatePost = (newPost) => {
    const {updatePost, selectedPost} = this.props
    updatePost(selectedPost, newPost)
  }

  handleDeleteModalAction = () => {
    const { removePost, selectedPost, history, match } = this.props
    removePost(selectedPost)
    this.closeDeleteModal()
    history.push(match.params.hasOwnProperty('category') ?
      `/${match.params.category}` : '/')
  }

  render() {
    const { fetchData, votePost, showDetails, selectedPost } = this.props
    const { editModalOpen, deleteModalOpen } = this.state

    return (
      <Grid.Column>
        <h1>
          { showDetails ? selectedPost.title : (
            <Link to={`/${selectedPost.category}/${selectedPost.id}`}>
              {selectedPost.title}
            </Link>
          )}
        </h1>
        Data: <b>{formatData(selectedPost.timestamp)}</b> -
        Autor: <b>{selectedPost.author}</b> -
        Categoria:
        <Link to={'/' + selectedPost.category} onClick={fetchData}>
          <b> {selectedPost.category}</b>
        </Link>
        { showDetails && (
          <Segment style={{ padding: '2em' }}>
            { selectedPost.body }
          </Segment>
        )}
        <Menu secondary>
          <Menu.Item name='post_menu' position='left'>
            <Label>
              <Icon name='thumbs up' /> {selectedPost.voteScore}
            </Label>
            { !showDetails && (
              <Label>
                <Icon name='comments' /> {selectedPost.commentCount}
              </Label>
            )}
          </Menu.Item>
          <Button.Group size='mini' floated='right'>
            <Button
              animated='vertical'
              onClick={ () => votePost(selectedPost, 'upVote') }
            >
              <Button.Content hidden>+1</Button.Content>
              <Button.Content visible>
                <Icon name='thumbs up' />
              </Button.Content>
            </Button>
            <Button
              animated='vertical'
              onClick={ () => votePost(selectedPost, 'downVote') }
            >
              <Button.Content hidden>-1</Button.Content>
              <Button.Content visible>
                <Icon name='thumbs down' />
              </Button.Content>
            </Button>
          </Button.Group>&nbsp;&nbsp;
          <Button.Group size='mini' floated='right'>
            <Button
              animated='vertical'
              color='green'
              onClick={ this.openEditPostModal }
            >
              <Button.Content hidden>Editar</Button.Content>
              <Button.Content visible>
                <Icon name='edit' />
              </Button.Content>
            </Button>
            <Button
              animated='vertical'
              color='red'
              onClick={ this.openDeleteModal }
            >
              <Button.Content hidden>Apagar</Button.Content>
              <Button.Content visible>
                <Icon name='trash' />
              </Button.Content>
            </Button>
          </Button.Group>&nbsp;&nbsp;
        </Menu>

        <PostEdit
          modalOpen={ editModalOpen }
          onCloseModal={ this.closeEditPostModal }
          isNewPost={ false }
          post={ selectedPost }
          onChangePost={ this.updatePost }
        />

        <DeletionModal
          modalOpen={ deleteModalOpen }
          modalBody={ 'Deseja apagar o post selecionado?' }
          onCancel={ this.closeDeleteModal }
          onConfirm={ this.handleDeleteModalAction }
        />
      </Grid.Column>
    )
  }
}

function mapStateToProps ({ sortOrder }) {
  return { sortOrder }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => dispatch(fetchData()),
    removePost: (data) => dispatch(removePost(data)),
    updatePost: (oldPost, newPost) => dispatch(updatePost(oldPost, newPost)),
    votePost: (post, option) => dispatch(votePost(post, option))
  }
}

Post.propTypes = {
  fetchData: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  removePost: PropTypes.func.isRequired,
  selectedPost: PropTypes.object.isRequired,
  showDetails: PropTypes.bool.isRequired,
  sortOrder: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired,
  votePost: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post))
