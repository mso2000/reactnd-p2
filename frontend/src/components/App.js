import React, { Component } from 'react';
import { connect } from 'react-redux'
import { fetchData } from '../actions'
import HeaderMenu from './HeaderMenu'
import CategoryMenu from './CategoryMenu'
import PostList from './PostList'
import PostDetails from './PostDetails'
import { Grid } from 'semantic-ui-react'
import { Route, withRouter } from 'react-router-dom'

/**
 * Componente principal do app que possui 3 modos de renderização:
 *
 * - padrão (rota: '/')
 *
 * Exibe cabeçalho (HeaderMenu), menu lateral (CategoryMenu) e lista de posts
 * (PostList)
 *
 * - por categoria (rota: '/{:category}')
 *
 * Exibe cabeçalho (HeaderMenu), menu lateral com a categoria selecionada
 * (CategoryMenu) e lista de posts (PostList) filtrada (ou mensagem de erro,
 * em caso de categoria inválida)
 *
 * - detalhes do post (rota: '/{:category}/{:id}')
 *
 * Exibe cabeçalho (HeaderMenu), menu lateral com a categoria selecionada
 * (CategoryMenu) e detalhes do post (PostDetails) ou mensagem de erro em caso
 * de post inválido)
 */
class App extends Component {

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
