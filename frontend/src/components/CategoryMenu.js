import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class CategoryMenu extends Component {
  state = { }

  handleItemClick = (e, obj) => this.props.onChangeCategory(obj.name)

  render() {
    const { categories, selectedCategory } = this.props

    return (
      <Grid.Column width={2} stretched>
        <Menu fluid vertical tabular>
          <Menu.Item as={Link} to='/' name='all' active={selectedCategory === 'all'} onClick={this.handleItemClick} >Todos</Menu.Item>
          {categories.map(c => (
            <Menu.Item as={Link} to={'/' + c.path} key={c.path} name={c.name} active={selectedCategory === c.path} onClick={this.handleItemClick} />
          ))}
        </Menu>
      </Grid.Column>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(CategoryMenu)
