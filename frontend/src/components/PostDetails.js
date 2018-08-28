import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class PostDetails extends Component {
  state = { }

  render() {
    const { match } = this.props

    return (
      <div>
        Post: {match.params.id} de {match.params.category}
      </div>
    )
  }
}

function mapStateToProps ({}) {
  return {}
}

function mapDispatchToProps ({}) {
  return {}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostDetails))
