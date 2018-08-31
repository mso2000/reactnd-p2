import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Segment } from 'semantic-ui-react'
import Post from './Post'
import sortBy from 'sort-by'

class PostList extends Component {
  state = {}
  // TODO: Considerar transformar em stateless

  render() {
    const { posts, sortOrder, match } = this.props

    const sortedPosts = (match.url === '/'
    ? posts.filter(p => p.hasOwnProperty('id'))
    : posts.filter(p => '/' + p.category === match.url))
    .sort(sortBy('-' + sortOrder))

    return (
      <Grid.Column>
        {sortedPosts.length ? sortedPosts.map(post => (
          <Segment key={post.id} style={{ padding: '2em' }}>
            <Post
              showDetails = { false }
              selectedPost = { post }
            />
          </Segment>
        )) : (
          <Segment style={{ padding: '2em' }}><h3>Nenhum post encontrado.</h3></Segment>
        )}
      </Grid.Column>
    )
  }
}

function mapStateToProps ({ posts, sortOrder }) {
  return { posts, sortOrder }
}

export default withRouter(connect(mapStateToProps)(PostList))
