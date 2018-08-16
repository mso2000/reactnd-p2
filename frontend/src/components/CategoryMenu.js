import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Menu } from 'semantic-ui-react'

class CategoryMenu extends Component {
  state = { }

  handleItemClick = (e, obj) => this.props.onChangeCategory(obj.name)

  render() {
    const { categories, selectedCategory } = this.props

    return (
      <Grid.Column width={2} stretched>
        <Menu fluid vertical tabular>
          <Menu.Item name='all' active={selectedCategory === 'all'} onClick={this.handleItemClick} />
          {categories.map(c => (
            <Menu.Item key={c.name} name={c.path} active={selectedCategory === c.path} onClick={this.handleItemClick} />
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
