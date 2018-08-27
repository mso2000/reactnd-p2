import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchData } from '../actions'
import HeaderMenu from './HeaderMenu'
import CategoryMenu from './CategoryMenu'
import PostList from './PostList'
import { Grid } from 'semantic-ui-react'
import { Route, Redirect, Switch } from 'react-router-dom'

class App extends Component {
  state = {}

  componentDidMount(){
    this.props.fetchData()
  }

  render() {
    return (
      <Grid divided='vertically' columns='equal' style={{ padding: '1em' }}>
        <Grid.Row columns={1}>
          <HeaderMenu />
        </Grid.Row>
        <Grid.Row columns={2}>
          <Switch>
            <Route exact path = '/' component = { CategoryMenu } />
            <Route exact path = '/:category' component = { CategoryMenu } />
            <Redirect to="/" />
          </Switch>
          <PostList />
        </Grid.Row>
      </Grid>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => dispatch(fetchData())
  }
}

export default connect(null, mapDispatchToProps)(App)
