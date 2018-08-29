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
    // TODO: Criar componente para exibir os principais dados do post e reusá-lo com PostList

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
          <Segment style={{ padding: '2em' }}>
            Pellentesque habitant morbi tristique senectus.
          </Segment>
          <Menu secondary>
            <Menu.Item name='post_menu' position='left'>
              <Label>
                <Icon name='thumbs up' /> {`5`}
              </Label>
              <Label>
                <Icon name='comments' /> {`2`}
              </Label>
            </Menu.Item>
            <Button.Group size='mini' floated='right'>
              <Button animated='vertical'>
                <Button.Content hidden>+1</Button.Content>
                <Button.Content visible>
                  <Icon name='thumbs up' />
                </Button.Content>
              </Button>
              <Button animated='vertical'>
                <Button.Content hidden>-1</Button.Content>
                <Button.Content visible>
                  <Icon name='thumbs down' />
                </Button.Content>
              </Button>
            </Button.Group>&nbsp;&nbsp;
            <Button.Group size='mini' floated='right'>
              <Button animated='vertical' color='green'>
                <Button.Content hidden>Editar</Button.Content>
                <Button.Content visible>
                  <Icon name='edit' />
                </Button.Content>
              </Button>
              <Button animated='vertical' color='red'>
                <Button.Content hidden>Apagar</Button.Content>
                <Button.Content visible>
                  <Icon name='trash' />
                </Button.Content>
              </Button>
            </Button.Group>&nbsp;&nbsp;
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
