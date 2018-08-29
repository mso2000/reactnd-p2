import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchData } from '../actions'
import { Link, withRouter } from 'react-router-dom'
import { Grid, Segment, Menu, Label, Icon, Comment, Header, Button } from 'semantic-ui-react'
import { formatData } from '../utils/helpers'

class PostDetails extends Component {
  state = { }

  render() {
    const { match } = this.props

    return (
      <Grid.Column>
        <Segment style={{ padding: '2em' }}>
          <h1>Post: {match.params.id}</h1>
          Data: <b>{formatData(12345678)}</b> -
          Autor: <b>{`Márcio`}</b> -
          Categoria:
          <Link to={'/' + match.params.category} onClick={fetchData}>
            <b> {match.params.category}</b>
          </Link>
          <Menu secondary>
            <Menu.Item name='post_menu' position='left'>
              <Label>
                <Icon name='thumbs up' /> {`5`}
              </Label>
              <Label>
                <Icon name='comments' /> {`2`}
              </Label>
            </Menu.Item>
          </Menu>

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
                  <Comment.Action>Responder</Comment.Action>
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
                  <Comment.Action>Responder</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          </Comment.Group>
        </Segment>
      </Grid.Column>
    )
  }
}

function mapStateToProps ({}) {
  return {}
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => dispatch(fetchData()),
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))
