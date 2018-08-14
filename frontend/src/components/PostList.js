import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Segment } from 'semantic-ui-react'


class PostList extends Component {
  state = {}

  render() {
    const {posts} = this.props

    return (
      <Grid.Column stretched>
        {posts.map(p => (
          <Segment key={p.id}>{p.title}</Segment>
          ))}
      </Grid.Column>
    )
  }
}

function mapStateToProps ({ posts }) {
  console.log(posts)
  return { posts }
}

export default connect(mapStateToProps)(PostList)
