import React, { Component } from 'react';
import * as ServerAPI from '../utils/ServerAPI'
import { connect } from 'react-redux'
import { addAllCategories, addAllPosts } from '../actions'
import HeaderMenu from './HeaderMenu'
import CategoryMenu from './CategoryMenu'
import PostList from './PostList'
import { Grid } from 'semantic-ui-react'

class App extends Component {
  state = {
    selectedCategory: 'all',
    sortOrder: 'timestamp'
  }

  changeCategory = (category) => {
    this.setState({ selectedCategory: category })
  }

  changeOrder = (order) => {
    this.setState({ sortOrder: order })
  }

  componentDidMount(){
    const { addCategories, addPosts } = this.props
    ServerAPI.getAllCategories().then(c => addCategories(c))
    ServerAPI.getAllPosts().then(p => addPosts(p))
  }

  render() {
    const { selectedCategory, sortOrder} = this.state
    return (
      <Grid divided='vertically' columns='equal' style={{ padding: '1em' }}>
        <Grid.Row columns={1}>
          <HeaderMenu
            sortOrder = { sortOrder }
            onChangeOrder = { this.changeOrder }
          />
        </Grid.Row>
        <Grid.Row columns={2}>
          <CategoryMenu
            selectedCategory = { selectedCategory }
            onChangeCategory = { this.changeCategory }
          />
          <PostList
            sortOrder={ sortOrder }
            selectedCategory = { selectedCategory }
          />
        </Grid.Row>
      </Grid>
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
