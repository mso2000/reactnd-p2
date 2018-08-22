import { combineReducers } from 'redux'

import {
  ADD_CATEGORIES,
  ADD_POSTS,
  ADD_NEW_POST,
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
    case ADD_NEW_POST :
      return [...state, action.post]
    case ADD_POSTS :
//      console.log(action.posts)
      return action.posts
    default :
      return state
  }
}

export default combineReducers({
  categories,
  posts,
})
