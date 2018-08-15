import React, { Component } from 'react';
import * as ServerAPI from '../utils/ServerAPI'
import { connect } from 'react-redux'
import { addAllCategories, addAllPosts } from '../actions'
import CategoryList from './CategoryList'
import PostList from './PostList'
import { Grid, Header, Image } from 'semantic-ui-react'

class App extends Component {
  state = { sortOrder: '-timestamp' }

  componentDidMount(){
    const {addCategories, addPosts} = this.props
    ServerAPI.getAllCategories().then(c => addCategories(c))
    ServerAPI.getAllPosts().then(p => addPosts(p))
  }

  render() {
    return (
      <Grid divided='vertically' columns='equal' style={{ padding: '1em' }}>
        <Grid.Row columns={1} align='left'>
          <Grid.Column>
            <Header as='h2'>
              <Image circular src='/favicon.ico' /> Leitura
              </Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <CategoryList />
          <PostList sortOrder={ this.state.sortOrder }/>
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
