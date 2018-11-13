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
  ADD_COMMENT,
  DELETE_COMMENT,
  UPDATE_COMMENT,
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
  let parentPost
  switch (action.type) {
    case ADD_ALL_POSTS :
      return action.posts
    case ADD_POST :
      return [...state, action.post]
    case DELETE_POST :
      return state.filter(p => p.id !== action.post.id)
    case UPDATE_POST :
      return [...state.filter(p => p.id !== action.post.id), action.post]
    case ADD_ALL_POST_COMMENTS :
      parentPost = {...state.find(p => p.id === action.post.id)}
      parentPost.commentCount = action.comments.length
      return [...state.filter(p => p.id !== action.post.id), parentPost]
    case ADD_COMMENT :
      parentPost = {...state.find(p => p.id === action.comment.parentId)}
      parentPost.commentCount++
      return [...state.filter(p => p.id !== parentPost.id), parentPost]
    case DELETE_COMMENT :
      parentPost = {...state.find(p => p.id === action.comment.parentId)}
      parentPost.commentCount--
      return [...state.filter(p => p.id !== parentPost.id), parentPost]
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
      return [...state.filter(c => c.parentId !== action.post.id), ...action.comments]
    case ADD_COMMENT :
      return [...state, action.comment]
    case DELETE_POST :
      return state.filter(c => c.parentId !== action.post.id)
    case DELETE_COMMENT :
      return state.filter(c => c.id !== action.comment.id)
    case UPDATE_COMMENT :
      return [...state.filter(c => c.id !== action.comment.id), action.comment]
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
