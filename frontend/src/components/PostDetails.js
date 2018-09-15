import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchPostComments, addNewComment,
        updateComment, removeComment, voteComment } from '../actions'
import { withRouter } from 'react-router-dom'
import { Grid, Segment, Label, Icon, Comment,
        Header, Button, Message } from 'semantic-ui-react'
import Post from './Post'
import CommentEdit from './CommentEdit'
import DeletionModal from './DeletionModal'
import sortBy from 'sort-by'
import { formatData } from '../utils/helpers'
import PropTypes from 'prop-types'

import {
  POST_ADD_COMMENT_BUTTON_LABEL,
  POST_COMMENTS_LABEL,
  COMMENT_ANSWER_LABEL,
  COMMENT_EDIT_LABEL,
  COMMENT_DELETE_LABEL,
  COMMENT_LIST_ERROR_TITLE,
  COMMENT_LIST_ERROR_BODY,
  POST_NOT_FOUND_ERROR,
  MODAL_COMMENT_DELETE_BODY
} from '../utils/constants.js'

/**
 * Exibe os detalhes de um post e a lista de comentários com os respectivos
 * controles e ordenados conforme botão selecionado no cabeçado do app (HeaderMenu)
 *
 * Quando não existem comentários, é exibida uma mensagem e quando o post não é
 * válido (rota inválida) é exibida uma outra mensagem de erro.
 */
export class PostDetails extends Component {
  state = {
    currentPost: {},
    currentComment: {},
    editModalOpen: false,
    deleteModalOpen: false
  }

  openEditCommentModal = (comment = { parentId: this.state.currentPost.id }) => {
    this.setState(
      {
        editModalOpen: true,
        currentComment: comment
      }
    )
  }

  closeEditCommentModal = () => this.setState(
    {
      editModalOpen: false,
      currentComment: {}
    }
  )

  openDeleteModal = (comment) => this.setState(
    {
      deleteModalOpen: true,
      currentComment: comment
    }
  )

  closeDeleteModal = () => this.setState(
    {
      deleteModalOpen: false,
      currentComment: {}
    }
  )

  updateComment = (newComment) => {
    const { currentComment } = this.state
    const { updateComment } = this.props
    updateComment(currentComment, newComment)
  }

  handleDeleteModalAction = () => {
    const { removeComment } = this.props
    const { currentComment } = this.state
    removeComment(currentComment)
    this.closeDeleteModal()
  }

  componentDidMount(){
    const { match, posts, fetchPostComments } = this.props
    const currentPost = posts.find(p => p.id === match.params.id)
    if(currentPost){
      fetchPostComments(currentPost)
      this.setState({ currentPost })
    }
  }

  /**
   * Carrega os comentários do backend apenas quando já existem posts na Store.
   * É necessário fazer isso pois quando esse componente é carregado antes da
   * lista de posts (pelo uso da rota de um post) os posts ainda não foram
   * carregados para a Store.
   *
   * E o estado do post atual só é setado quando há mudança no conteúdo dos posts
   * para evitar um loop infinito, pois o fetchPostComments provoca uma nova
   * execução deste método.
   */
  componentDidUpdate(prevProps){
    const { match, posts, fetchPostComments } = this.props
    const currentPost = posts.find(p => p.id === match.params.id)
    if(currentPost){
      if(prevProps.posts.length !== posts.length){
        fetchPostComments(currentPost)
      }
      if(prevProps.posts !== posts){
        this.setState({ currentPost })
      }
    }
  }

  render() {
    const { comments, sortOrder, addNewComment, voteComment, match} = this.props
    const { currentPost, currentComment, editModalOpen, deleteModalOpen } = this.state

    const sortedComments = comments
    .filter(c => c.parentId === currentPost.id)
    .sort(sortBy('-' + sortOrder))

    return (
      <Grid.Column>
        {currentPost.hasOwnProperty('id') &&
        (currentPost.category === match.params.category) ? (
          <Segment style={{ padding: '2em' }}>
            <Post
              showDetails = { true }
              selectedPost = { currentPost }
            />

            <Comment.Group>
              <Button
                primary
                content={ POST_ADD_COMMENT_BUTTON_LABEL }
                labelPosition='left'
                icon='edit'
                onClick={ () => this.openEditCommentModal() }
              />
              <Header as='h3' dividing>
                {POST_COMMENTS_LABEL} ({currentPost.commentCount})
              </Header>

              {sortedComments.length ? sortedComments.map(comment => (
                <Comment key={ comment.id }>
                  <Comment.Avatar src='/avatar.jpg' />
                  <Comment.Content>
                    <Comment.Author as='a'>{comment.author}</Comment.Author>
                    <Comment.Metadata>
                      <div>{formatData(comment.timestamp)}</div>
                    </Comment.Metadata>
                    <Comment.Text>{comment.body}</Comment.Text>
                    <Comment.Actions>
                      <Label size='mini'>
                        <Icon name='thumbs up' /> {comment.voteScore}
                      </Label>
                      &nbsp;
                      <Comment.Action onClick={() => voteComment(comment, 'upVote')}>
                        &#9650;
                      </Comment.Action>
                      <Comment.Action onClick={() => voteComment(comment, 'downVote')}>
                        &#9660;
                      </Comment.Action>
                      &#8226;&nbsp;&nbsp;
                      <Comment.Action onClick={() => this.openEditCommentModal()}>
                        {COMMENT_ANSWER_LABEL}
                      </Comment.Action>
                      &#8226;&nbsp;&nbsp;&nbsp;
                      <Comment.Action onClick={() => this.openEditCommentModal(comment)}>
                        {COMMENT_EDIT_LABEL}
                      </Comment.Action>
                      &#8226;&nbsp;&nbsp;&nbsp;
                      <Comment.Action onClick={() => this.openDeleteModal(comment)}>
                        {COMMENT_DELETE_LABEL}
                      </Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              )) : (
                <Message info>
                  <Message.Header>{COMMENT_LIST_ERROR_TITLE}</Message.Header>
                  <p>{COMMENT_LIST_ERROR_BODY}</p>
                </Message>
              )}
            </Comment.Group>
          </Segment>
        ) : (
          <Segment style={{ padding: '2em' }}><h3>{POST_NOT_FOUND_ERROR}</h3></Segment>
        )}

        <CommentEdit
          modalOpen={ editModalOpen }
          onCloseModal={ this.closeEditCommentModal }
          isNewComment={ !currentComment.hasOwnProperty('id') }
          comment={ currentComment }
          onChangeComment={ currentComment.hasOwnProperty('id') ?
            this.updateComment : addNewComment }
        />

        <DeletionModal
          modalOpen={ deleteModalOpen }
          modalBody={ MODAL_COMMENT_DELETE_BODY }
          onCancel={ this.closeDeleteModal }
          onConfirm={ this.handleDeleteModalAction }
        />
      </Grid.Column>
    )
  }
}

function mapStateToProps ({ posts, comments, sortOrder }) {
  return { posts, comments, sortOrder }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchPostComments: (data) => dispatch(fetchPostComments(data)),
    addNewComment: (data) => dispatch(addNewComment(data)),
    updateComment: (oldData, newData) => dispatch(updateComment(oldData, newData)),
    removeComment: (data) => dispatch(removeComment(data)),
    voteComment: (comment, option) => dispatch(voteComment(comment, option))
  }
}

PostDetails.propTypes = {
  addNewComment: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  fetchPostComments: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  removeComment: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  updateComment: PropTypes.func.isRequired,
  voteComment: PropTypes.func.isRequired
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))
