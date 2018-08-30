import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addNewPost, selectSortOrder } from '../actions'
import PostEdit from './PostEdit'
import { Grid, Menu, Header, Image, Button } from 'semantic-ui-react'

class HeaderMenu extends Component {
  state = { newPostModalOpen: false }

  handleMenuItemClick = (e, obj) => this.props.selectSortOrder(obj.name)
  openNewPostModal = () => this.setState(() => ({ newPostModalOpen: true }))
  closeNewPostModal = () => this.setState(() => ({ newPostModalOpen: false }))

  render() {
    const { sortOrder, addNewPost } = this.props
    const { newPostModalOpen } = this.state

    return (
      <Grid.Column>
        <Menu secondary>
          <Menu.Item name='logo'>
            <Header as='h2'>
              <Image circular src='/favicon.ico' /> Leitura
            </Header>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item name='sort_by'><b>Ordenar por:</b></Menu.Item>
            <Menu.Item name='timestamp' active={sortOrder === 'timestamp'} onClick={this.handleMenuItemClick}>Data</Menu.Item>
            <Menu.Item name='voteScore' active={sortOrder === 'voteScore'} onClick={this.handleMenuItemClick}>Votos</Menu.Item>
          </Menu.Menu>
          <Menu.Item name='new_post'>
            <Button content='Novo Post' labelPosition='left' icon='edit' primary onClick={ this.openNewPostModal } />
            <PostEdit
              modalOpen={ newPostModalOpen }
              onCloseModal={ this.closeNewPostModal }
              onAddPost={addNewPost}
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderMenu)
