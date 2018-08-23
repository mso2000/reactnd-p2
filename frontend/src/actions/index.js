import * as ServerAPI from '../utils/ServerAPI'

export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const SELECT_SORT_ORDER = 'SELECT_SORT_ORDER'
export const ADD_POSTS = 'ADD_POSTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const DELETE_POST = 'DELETE_POST'

export function fetchData() {
  return (dispatch) => {
    ServerAPI.getAllCategories()
    .then(c => {
      dispatch(addAllCategories(c))

      ServerAPI.getAllPosts()
      .then(p => dispatch(addAllPosts(p)))
      .catch(error => console.log(`Server error: ${error}.`))
    })
    .catch(error => console.log(`Server error: ${error}.`))
  }
}

export function changeCategory(category) {
  return (dispatch, getState) => {
    if(getState().categories.length)
      dispatch(selectCategory(category))
//    dispatch(fetchData())
// TODO: Avaliar porque o re-fetch está causando problemas com Router
  }
}

export function addAllCategories (categories) {
  return {
    type: ADD_CATEGORIES,
    categories
  }
}

export function selectCategory (category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

export function selectSortOrder (sortOrder) {
  return {
    type: SELECT_SORT_ORDER,
    sortOrder
  }
}

export function addAllPosts (posts) {
  return {
    type: ADD_POSTS,
    posts
  }
}

export function addNewPost (post) {
  return {
    type: ADD_NEW_POST,
    post
  }
}

export function deletePost (post) {
  return {
    type: DELETE_POST,
    post
  }
}
