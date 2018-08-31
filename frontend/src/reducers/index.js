import { combineReducers } from 'redux'

import {
  ADD_CATEGORIES,
  CATEGORIES_ARE_LOADING,
  SELECT_SORT_ORDER,
  ADD_ALL_POSTS,
  POSTS_ARE_LOADING,
  ADD_POST,
  DELETE_POST,
  UPDATE_POST,
  ADD_ALL_POST_COMMENTS,
  COMMENTS_ARE_LOADING,
} from '../actions'

function categories (state = [], action) {
  switch (action.type) {
    case ADD_CATEGORIES :
      return action.categories
    default :
      return state
  }
}

function categoriesAreLoading (state = false, action) {
  switch (action.type) {
    case CATEGORIES_ARE_LOADING :
      return action.isLoading
    default :
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
    case ADD_ALL_POSTS :
      return action.posts
    case ADD_POST :
      return [...state, action.post]
    case DELETE_POST :
      return state.filter(p => p.id !== action.post.id)
    case UPDATE_POST :
      return [...state.filter(p => p.id !== action.post.id), action.post]
    default :
      return state
  }
}

function postsAreLoading (state = false, action) {
  switch (action.type) {
    case POSTS_ARE_LOADING :
      return action.isLoading
    default :
      return state
  }
}

function comments (state = [], action) {
  switch (action.type) {
    case ADD_ALL_POST_COMMENTS:
      return [...state.filter(p => p.parentId !== action.post.id), ...action.comments]
    default :
      return state
  }
}

function commentsAreLoading (state = false, action) {
  switch (action.type) {
    case COMMENTS_ARE_LOADING :
      return action.isLoading
    default :
      return state
  }
}

export default combineReducers({
  categories,
  categoriesAreLoading,
  sortOrder,
  posts,
  postsAreLoading,
  comments,
  commentsAreLoading
})
