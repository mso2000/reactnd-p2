import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Segment } from 'semantic-ui-react'
import { formatData } from '../utils/helpers'
import sortBy from 'sort-by'

class PostList extends Component {
  state = {}

  render() {
    const { posts, sortOrder } = this.props
    const sortedPosts = posts.sort(sortBy(sortOrder))

    return (
      <Grid.Column stretched>
        {sortedPosts.map(p => (
          <Segment key={p.id}>[{formatData(p.timestamp)}] {p.title}</Segment>
          ))}
      </Grid.Column>
    )
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(PostList)
