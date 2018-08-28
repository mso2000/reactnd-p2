import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchData } from '../actions'
import HeaderMenu from './HeaderMenu'
import CategoryMenu from './CategoryMenu'
import PostList from './PostList'
import PostDetails from './PostDetails'
import { Grid } from 'semantic-ui-react'
import { Route, withRouter } from 'react-router-dom'

class App extends Component {
  state = {}

  componentDidMount(){
    this.props.fetchData()
  }

  render() {
    return (
      <Grid divided='vertically' columns='equal' style={{ padding: '1em' }}>
        <Grid.Row columns={1}>
          <Route path = '/' render={({history}) => (
            <HeaderMenu history={history}/>
          )} />
        </Grid.Row>
        <Grid.Row columns={2}>
          <Route exact path = '/' component = {CategoryMenu} />
          <Route exact path = '/' component = {PostList} />
          <Route path = '/:category' component = {CategoryMenu} />
          <Route exact path = '/:category' component = {PostList} />
          <Route exact path = '/:category/:id' component = {PostDetails} />
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

export default withRouter(connect(null, mapDispatchToProps)(App))
