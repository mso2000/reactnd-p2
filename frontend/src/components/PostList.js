import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Segment, Button, Icon, Menu } from 'semantic-ui-react'
import { formatData } from '../utils/helpers'
import sortBy from 'sort-by'

class PostList extends Component {
  state = {}
  handleButtonClick = (post) => this.props.onDeletePost(post)

  render() {
    const { posts, sortOrder, selectedCategory } = this.props
    const sortedPosts = (selectedCategory === 'all'
    ? posts.filter(p => p.hasOwnProperty('id'))
    : posts.filter(p => p.category === selectedCategory))
    .sort(sortBy('-' + sortOrder))
    // TODO: Formatar adequadamente: timestamp, title, author, category, voteScore, commentCount
    // TODO: Adicionar link para abrir view de detalhes
    // TODO: Mover botão de deleção para detalhes da postagem

    return (
      <Grid.Column>
        {sortedPosts.length ? sortedPosts.map(p => (
          <Segment key={p.id} style={{ padding: '2em' }}>
            <Grid.Column>
            [{formatData(p.timestamp)}] {p.title} ({p.voteScore})
            </Grid.Column>
            <Menu secondary>
              <Menu.Item name='post_menu' position='right'>
                <Button animated='vertical' color='red' onClick={() => this.handleButtonClick(p)}>
                  <Button.Content hidden>Apagar</Button.Content>
                  <Button.Content visible>
                    <Icon name='trash' />
                  </Button.Content>
                </Button>
              </Menu.Item>
            </Menu>
          </Segment>
        )) : (
          <Segment style={{ padding: '2em' }}>Nenhum post encontrado.</Segment>
        )}
      </Grid.Column>
    )
  }
}

function mapStateToProps ({ posts, selectedCategory, sortOrder }) {
  return { posts, selectedCategory, sortOrder }
}

export default connect(mapStateToProps)(PostList)
