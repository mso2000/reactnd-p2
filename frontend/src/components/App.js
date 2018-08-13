import React, { Component } from 'react';
import '../App.css';
import * as ServerAPI from '../utils/ServerAPI'
import { connect } from 'react-redux'
import { addAllCategories, addAllPosts } from '../actions'
import CategoryList from './CategoryList'
import PostList from './PostList'

class App extends Component {
  state = {}

  componentDidMount(){
    const {addCategories, addPosts} = this.props
    ServerAPI.getAllCategories().then(c => addCategories(c))
    ServerAPI.getAllPosts().then(p => addPosts(p))
  }

  render() {
    return (
      <div>
        <CategoryList />
        <PostList />
      </div>
    )
  }
}


function mapDispatchToProps (dispatch) {
  return {
    addCategories: (data) => dispatch(addAllCategories(data)),
    addPosts: (data) => dispatch(addAllPosts(data))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App)
