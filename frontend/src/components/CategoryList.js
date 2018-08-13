import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux'

class CategoryList extends Component {
  state = {}

  render() {
    const {categories} = this.props

    return (
      <div>
        <p>CATEGORIAS</p>
        <ol>
          {categories.map(c => (
            <li key={c.name}>{c.path}</li>
          ))}
        </ol>
      </div>
    )
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(CategoryList)
