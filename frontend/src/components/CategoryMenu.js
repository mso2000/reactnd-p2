import React from 'react';
import { connect } from 'react-redux'
import { fetchData } from '../actions'
import { Grid, Menu } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { MAIN_MENU_ITEM_ALL } from '../utils/constants.js'

/**
 * Exibe o menu lateral com as categorias. Sempre que uma nova categoria é
 * selecionada, um novo fetch na API de categorias e posts é realizado para
 * garantir a sincronia com o backend
 */
 export const CategoryMenu = (props) => {
  const { categories, match, fetchData } = props

  return (
    <Grid.Column width={2} stretched>
      <Menu fluid vertical tabular>
        <Menu.Item
          as={Link}
          to='/'
          name='all'
          active={match.url === '/'}
          onClick={fetchData}
        >
          { MAIN_MENU_ITEM_ALL }
        </Menu.Item>
        {categories.map(c => (
          <Menu.Item
            as={Link}
            to={'/' + c.path}
            key={c.path}
            name={c.path}
            active={match.url === '/' + c.path}
            onClick={fetchData}
          />
        ))}
      </Menu>
    </Grid.Column>
  )
}

function mapStateToProps ({ categories }) {
  return { categories }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchData: () => dispatch(fetchData())
  }
}

CategoryMenu.propTypes = {
  categories: PropTypes.array.isRequired,
  fetchData: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CategoryMenu)
)
