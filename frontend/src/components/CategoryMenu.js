import React, { Component } from 'react';
import { connect } from 'react-redux'
import { changeCategory } from '../actions'
import { Grid, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class CategoryMenu extends Component {
  state = { matchedCategory : 'all' }

  handleItemClick = (e, obj) => this.props.changeCategory(obj.name)

  componentDidMount() {
    const { changeCategory, match } = this.props
    const matchedCategory = match.params.category ? match.params.category : 'all'
    changeCategory(matchedCategory)
  }

  componentDidUpdate(prevProps){
    const { categories, match, history } = this.props
    if(categories.length){
      const matchedCategory = match.params.category ? match.params.category : 'all'
      const validCategoryFound = matchedCategory === 'all' || categories.find(c => c.path === matchedCategory)
      if(!validCategoryFound)
        history.push('/')
    }
  }


  render() {
    const { categories, selectedCategory } = this.props

    return (
      <Grid.Column width={2} stretched>
        <Menu fluid vertical tabular>
          <Menu.Item as={Link} to='/' name='all' active={selectedCategory === 'all'} onClick={this.handleItemClick} >Todos</Menu.Item>
          {categories.map(c => (
            <Menu.Item as={Link} to={'/' + c.path} key={c.path} name={c.path} active={selectedCategory === c.path} onClick={this.handleItemClick} />
          ))}
        </Menu>
      </Grid.Column>
    )
  }
}

function mapStateToProps ({ categories, selectedCategory }) {
  return { categories, selectedCategory }
}

function mapDispatchToProps (dispatch) {
  return {
    changeCategory: (data) => dispatch(changeCategory(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu)
