import { combineReducers } from 'redux'

import {
  ADD_CATEGORIES,
  ADD_POSTS,
} from '../actions'

function categories (state = [], action) {
  switch (action.type) {
    case ADD_CATEGORIES :
      return action.categories
    default :
      return state
  }
}

function posts (state = [], action) {
  switch (action.type) {
    case ADD_POSTS :
      return action.posts
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
})
