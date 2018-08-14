import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Grid, Menu } from 'semantic-ui-react'

class CategoryList extends Component {
  state = { activeItem: 'all' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    const { categories } = this.props

    return (
      <Grid.Column width={2} stretched>
        <Menu fluid vertical tabular>
          <Menu.Item name='all' active={activeItem === 'all'} onClick={this.handleItemClick} />
          {categories.map(c => (
            <Menu.Item key={c.name} name={c.path} active={activeItem === c.path} onClick={this.handleItemClick} />
          ))}
        </Menu>
      </Grid.Column>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(CategoryList)
