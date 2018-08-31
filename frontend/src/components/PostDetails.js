import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchData } from '../actions'
import { withRouter } from 'react-router-dom'
import { Grid, Segment, Label, Icon, Comment, Header, Button } from 'semantic-ui-react'
import Post from './Post'

class PostDetails extends Component {
  state = { currentPost: {} }

  render() {
    const { match, posts } = this.props
    const currentPost = posts.find(p => p.id === match.params.id)

    return (
      <Grid.Column>
        {currentPost ? (
          <Segment style={{ padding: '2em' }}>
            <Post
              showDetails = { true }
              selectedPost = { currentPost }
            />

            <Comment.Group>
              <Button content='Adicionar Comentário' labelPosition='left' icon='edit' primary />
              <Header as='h3' dividing>
                Comentários
              </Header>

              <Comment>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                <Comment.Content>
                  <Comment.Author as='a'>Matt</Comment.Author>
                  <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                  </Comment.Metadata>
                  <Comment.Text>How artistic!</Comment.Text>
                  <Comment.Actions>
                    <Label size='mini'>
                      <Icon name='thumbs up' /> {`2`}
                    </Label>
                    &nbsp;
                    <Comment.Action>&#9650;</Comment.Action>
                    <Comment.Action>&#9660;</Comment.Action>
                    &#8226;&nbsp;&nbsp;
                    <Comment.Action>Responder</Comment.Action>
                    &#8226;&nbsp;&nbsp;&nbsp;
                    <Comment.Action>Editar</Comment.Action>
                    &#8226;&nbsp;&nbsp;&nbsp;
                    <Comment.Action>Apagar</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>

              <Comment>
                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
                <Comment.Content>
                  <Comment.Author as='a'>Joe Henderson</Comment.Author>
                  <Comment.Metadata>
                    <div>5 days ago</div>
                  </Comment.Metadata>
                  <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                  <Comment.Actions>
                    <Label size='mini'>
                      <Icon name='thumbs up' /> {`5`}
                    </Label>
                    &nbsp;
                    <Comment.Action>&#9650;</Comment.Action>
                    <Comment.Action>&#9660;</Comment.Action>
                    &#8226;&nbsp;&nbsp;&nbsp;
                    <Comment.Action>Responder</Comment.Action>
                    &#8226;&nbsp;&nbsp;&nbsp;
                    <Comment.Action>Editar</Comment.Action>
                    &#8226;&nbsp;&nbsp;&nbsp;
                    <Comment.Action>Apagar</Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </Segment>
        ) : (
          <Segment style={{ padding: '2em' }}><h3>Post não encontrado.</h3></Segment>
        )}
      </Grid.Column>
    )
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => dispatch(fetchData()),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))
