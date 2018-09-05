import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Grid, Segment } from 'semantic-ui-react'
import Post from './Post'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'
import { POST_LIST_ERROR } from '../utils/constants.js'

const PostList = (props) => {
  const { posts, sortOrder, match } = props

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
        <Segment style={{ padding: '2em' }}>
          <h3>{ POST_LIST_ERROR }</h3>
        </Segment>
      )}
    </Grid.Column>
  )
}

function mapStateToProps ({ posts, sortOrder }) {
  return { posts, sortOrder }
}

PostList.propTypes = {
  match: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  sortOrder: PropTypes.string.isRequired
}

export default withRouter(connect(mapStateToProps)(PostList))
