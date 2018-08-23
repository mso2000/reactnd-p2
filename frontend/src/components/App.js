import React, { Component } from 'react';
import * as ServerAPI from '../utils/ServerAPI'
import { connect } from 'react-redux'
import { addAllCategories, selectCategory, addAllPosts, addNewPost, deletePost } from '../actions'
import HeaderMenu from './HeaderMenu'
import CategoryMenu from './CategoryMenu'
import PostList from './PostList'
import { Grid } from 'semantic-ui-react'
import { Route, Redirect, Switch } from 'react-router-dom'

class App extends Component {
  state = {}

  changeCategory = (category) => {
    const { addCategories, addPosts, selectCategory } = this.props
    ServerAPI.getAllCategories()
    .then(c => addCategories(c))
    .catch(error => console.log(`Server error: ${error}.`))
    ServerAPI.getAllPosts().then(p => addPosts(p))
    selectCategory(category)
  }

  addNewPost = (post) => {
    this.props.addNewPost(post)
    ServerAPI.addPost(post)
    .then(res => {
      if(!res.hasOwnProperty('id')){
        console.log('Insertion error. Rolling back changes...')
        this.props.deletePost(post)
      }
    })
    .catch(error => {
      console.log(`Server error: ${error}.\n\nRolling back changes...`)
      this.props.deletePost(post)
    })
    // TODO: Ao criar um post, exibir view de detalhes do mesmo
  }

  deletePost = (post) => {
    this.props.deletePost(post)
    ServerAPI.deletePost(post)
    .then(res => {
      if(res.hasOwnProperty('error')){
        console.log('Delete error. Rolling back changes...')
        this.props.addNewPost(post)
      }
    })
    .catch(error => {
      console.log(`Server error: ${error}.\n\nRolling back changes...`)
      this.props.addNewPost(post)
    })
  }

  componentDidMount(){
    const { addCategories, addPosts } = this.props
    ServerAPI.getAllCategories()
    .then(c => addCategories(c))
    .catch(error => console.log(`Server error: ${error}.`))
    ServerAPI.getAllPosts().then(p => addPosts(p))
  }

  render() {
    return (
      <Grid divided='vertically' columns='equal' style={{ padding: '1em' }}>
        <Grid.Row columns={1}>
          <HeaderMenu
            onAddPost = { this.addNewPost }
          />
        </Grid.Row>
        <Switch>
          <Route exact path = '/' render = { this.doRoute } />
          <Route exact path = '/:category' render = { this.doRoute } />
          <Redirect to="/" />
        </Switch>
      </Grid>
    )
  }

  doRoute = (props) => {
    const matchedCategory = props.match.params.category ? props.match.params.category : 'all'

    return (
      <Grid.Row columns={2}>
        <CategoryMenu
          matchedCategory = { matchedCategory }
          history = { props.history }
          onChangeCategory = { this.changeCategory }
        />
        <PostList onDeletePost = { this.deletePost }
        />
      </Grid.Row>
    )
  }
}


function mapDispatchToProps (dispatch) {
  return {
    addCategories: (data) => dispatch(addAllCategories(data)),
    selectCategory: (data) => dispatch(selectCategory(data)),
    addPosts: (data) => dispatch(addAllPosts(data)),
    addNewPost: (data) => dispatch(addNewPost(data)),
    deletePost: (data) => dispatch(deletePost(data))
  }
}

export default connect(null, mapDispatchToProps)(App)
