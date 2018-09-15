import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addNewPost, selectSortOrder } from '../actions'
import PostEdit from './PostEdit'
import { Grid, Menu, Header, Image, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import {
  HEADER_APP_NAME,
  HEADER_SORT_LABEL,
  HEADER_MENU_ITEM_DATE,
  HEADER_MENU_ITEM_VOTE,
  HEADER_BUTTON_LABEL
} from '../utils/constants.js'

/**
 * Exibe o cabeçalho do app com os botões de ordenação e criação de um novo post
 */
export class HeaderMenu extends Component {
  state = { newPostModalOpen: false }

  handleMenuItemClick = (e, { name }) => this.props.selectSortOrder(name)
  openNewPostModal = () => this.setState({ newPostModalOpen: true })
  closeNewPostModal = () => this.setState({ newPostModalOpen: false })

  render() {
    const { sortOrder, addNewPost } = this.props
    const { newPostModalOpen } = this.state

    return (
      <Grid.Column>
        <Menu secondary>
          <Menu.Item name='logo'>
            <Header as='h2'>
              <Image circular src='/favicon.ico' /> { HEADER_APP_NAME }
            </Header>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item name='sort_by'><b>{HEADER_SORT_LABEL}:</b></Menu.Item>
            <Menu.Item
              name='timestamp'
              active={ sortOrder === 'timestamp' }
              onClick={ this.handleMenuItemClick }
            >
              {HEADER_MENU_ITEM_DATE}
            </Menu.Item>
            <Menu.Item
              name='voteScore'
              active={ sortOrder === 'voteScore' }
              onClick={ this.handleMenuItemClick }
            >
              {HEADER_MENU_ITEM_VOTE}
            </Menu.Item>
          </Menu.Menu>
          <Menu.Item name='new_post'>
            <Button
              primary
              content={HEADER_BUTTON_LABEL}
              labelPosition='left'
              icon='edit'
              onClick={ this.openNewPostModal }
            />
            <PostEdit
              modalOpen={ newPostModalOpen }
              onCloseModal={ this.closeNewPostModal }
              isNewPost={ true }
              post={{}}
              onChangePost={addNewPost}
            />
          </Menu.Item>
        </Menu>
      </Grid.Column>
    )
  }
}


function mapStateToProps ({ sortOrder }) {
  return { sortOrder }
}

function mapDispatchToProps (dispatch) {
  return {
    addNewPost: (data) => dispatch(addNewPost(data)),
    selectSortOrder: (data) => dispatch(selectSortOrder(data))
  }
}

HeaderMenu.propTypes = {
  addNewPost: PropTypes.func.isRequired,
  selectSortOrder: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu)
