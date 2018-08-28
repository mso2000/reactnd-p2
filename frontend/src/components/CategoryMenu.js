import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchData } from '../actions'
import { Grid, Menu } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

class CategoryMenu extends Component {
  state = { }
  // TODO: Considerar transformar em stateless

  render() {
    const { categories, match, fetchData } = this.props

    return (
      <Grid.Column width={2} stretched>
        <Menu fluid vertical tabular>
          <Menu.Item as={Link} to='/' name='all' active={match.url === '/'} onClick={fetchData}>Todos</Menu.Item>
          {categories.map(c => (
            <Menu.Item as={Link} to={'/' + c.path} key={c.path} name={c.path} active={match.url === '/' + c.path} onClick={fetchData} />
          ))}
        </Menu>
      </Grid.Column>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => dispatch(fetchData())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryMenu))
