import React, { Component } from 'react';
import { Grid, Menu, Header, Image } from 'semantic-ui-react'

class HeaderMenu extends Component {
  state = { }

  handleItemClick = (e, obj) => this.props.onChangeOrder(obj.name)

  render() {
    const { sortOrder } = this.props

    return (
      <Grid.Column>
        <Menu secondary>
          <Menu.Item name='logo'>
            <Header as='h2'>
              <Image circular src='/favicon.ico' /> Leitura
            </Header>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item name='timestamp' active={sortOrder === 'timestamp'} onClick={this.handleItemClick}>Data</Menu.Item>
            <Menu.Item name='voteScore' active={sortOrder === 'voteScore'} onClick={this.handleItemClick}>Votos</Menu.Item>
          </Menu.Menu>
        </Menu>
      </Grid.Column>
    )
  }
}


export default HeaderMenu
