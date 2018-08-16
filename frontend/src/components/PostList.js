import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Segment } from 'semantic-ui-react'
import { formatData } from '../utils/helpers'
import sortBy from 'sort-by'

class PostList extends Component {
  state = {}

  render() {
    const { posts, sortOrder, selectedCategory } = this.props
    const sortedPosts = (selectedCategory === 'all'
    ? posts
    : posts.filter(p => p.category === selectedCategory))
    .sort(sortBy('-' + sortOrder))

    return (
      <Grid.Column>
        {sortedPosts.length ? sortedPosts.map(p => (
          <Segment key={p.id} style={{ padding: '2em' }}>[{formatData(p.timestamp)}] {p.title} ({p.voteScore})</Segment>
        )) : (
          <Segment style={{ padding: '2em' }}>Nenhum post encontrado.</Segment>
        )}
      </Grid.Column>
    )
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(PostList)
