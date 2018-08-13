import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'

class PostList extends Component {
  state = {}

  render() {
    const {posts} = this.props

    return (
      <div>
        <p>POSTS</p>
        <ol>
          {posts.map(p => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ol>
      </div>
    )
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(PostList)
