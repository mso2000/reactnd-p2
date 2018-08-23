import { combineReducers } from 'redux'

import {
  ADD_CATEGORIES,
  SELECT_CATEGORY,
  SELECT_SORT_ORDER,
  ADD_POSTS,
  ADD_NEW_POST,
  DELETE_POST,
} from '../actions'

function categories (state = [], action) {
  switch (action.type) {
    case ADD_CATEGORIES :
      return action.categories
    default :
      return state
  }
}

function selectedCategory(state = 'all', action) {
  switch (action.type) {
    case SELECT_CATEGORY :
      return action.category
    default:
      return state
  }
}

function sortOrder(state = 'voteScore', action) {
  switch (action.type) {
    case SELECT_SORT_ORDER :
      return action.sortOrder
    default:
      return state
  }
}

function posts (state = [], action) {
  switch (action.type) {
    case ADD_POSTS :
      return action.posts
    case ADD_NEW_POST :
      return [...state, action.post]
    case DELETE_POST :
      return state.filter(p => p.id !== action.post.id)
    default :
      return state
  }
}

export default combineReducers({
  categories,
  selectedCategory,
  sortOrder,
  posts,
})
