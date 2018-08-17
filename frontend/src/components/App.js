import React, { Component } from 'react';
import * as ServerAPI from '../utils/ServerAPI'
import { connect } from 'react-redux'
import { addAllCategories, addAllPosts } from '../actions'
import HeaderMenu from './HeaderMenu'
import CategoryMenu from './CategoryMenu'
import PostList from './PostList'
import { Grid } from 'semantic-ui-react'
import { Route, Redirect, Switch } from 'react-router-dom'

class App extends Component {
  state = {
    selectedCategory: 'all',
    sortOrder: 'timestamp'
  }

  changeCategory = (category) => {
    const { addCategories, addPosts } = this.props
    ServerAPI.getAllCategories().then(c => addCategories(c))
    ServerAPI.getAllPosts().then(p => addPosts(p))
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
    const { sortOrder } = this.state

    return (
      <Grid divided='vertically' columns='equal' style={{ padding: '1em' }}>
        <Grid.Row columns={1}>
          <HeaderMenu
            sortOrder = { sortOrder }
            onChangeOrder = { this.changeOrder }
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
    const { selectedCategory, sortOrder} = this.state
    const { categories } = this.props

    return (<HandlerRoute
      {...props}
      categories = { categories }
      sortOrder = { sortOrder }
      selectedCategory = { selectedCategory }
      onChangeCategory = { this.changeCategory } />)
  }
}


class HandlerRoute extends Component {

  state = { invalidRoute: '' }

  componentDidUpdate(prevProps){
    if(prevProps.categories !== this.props.categories){
      const { categories, selectedCategory, match, onChangeCategory } = this.props
      const path =  match.url.split("/").pop()
      const newCategoryFound = categories.find(c => c.path === path)

      if (newCategoryFound){
        const newCategory = newCategoryFound.path
        if (selectedCategory !== newCategory)
          onChangeCategory(newCategory.length ? newCategory : 'all')
      } else {
        this.setState({ invalidRoute: path })
        onChangeCategory('all')
      }
    }
  }

  render() {
    const { selectedCategory, sortOrder, onChangeCategory } = this.props

    return (this.state.invalidRoute.length ? (
      <Redirect to="/" />
    ) : (
      <Grid.Row columns={2}>
        <CategoryMenu
          selectedCategory = { selectedCategory }
          onChangeCategory = { onChangeCategory }
        />
        <PostList
          sortOrder={ sortOrder }
          selectedCategory = { selectedCategory }
        />
      </Grid.Row>
    ))
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

function mapDispatchToProps (dispatch) {
  return {
    addCategories: (data) => dispatch(addAllCategories(data)),
    addPosts: (data) => dispatch(addAllPosts(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
