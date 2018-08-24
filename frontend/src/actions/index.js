import * as ServerAPI from '../utils/ServerAPI'

export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const CATEGORIES_ARE_LOADING = 'CATEGORIES_ARE_LOADING'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const SELECT_SORT_ORDER = 'SELECT_SORT_ORDER'
export const ADD_POSTS = 'ADD_POSTS'
export const POSTS_ARE_LOADING = 'POSTS_ARE_LOADING'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const DELETE_POST = 'DELETE_POST'

export function fetchData() {
  return (dispatch, getState) => {
    if(getState().categoriesAreLoading) return
    dispatch(categoriesAreLoading(true))

    ServerAPI.getAllCategories()
    .then(c => {
      dispatch(addAllCategories(c))
      dispatch(categoriesAreLoading(false))

      if(getState().postsAreLoading) return
      dispatch(postsAreLoading(true))

      ServerAPI.getAllPosts()
      .then(p => {
        dispatch(addAllPosts(p))
        dispatch(postsAreLoading(false))
      })
      .catch(error => console.log(`Server error: ${error}.`))
    })
    .catch(error => console.log(`Server error: ${error}.`))
  }
}

export function changeCategory(category) {
  return (dispatch, getState) => {
    dispatch(selectCategory(category))
    dispatch(fetchData())
  }
}

export function addAllCategories (categories) {
  return {
    type: ADD_CATEGORIES,
    categories
  }
}

export function categoriesAreLoading (isLoading) {
  return {
    type: CATEGORIES_ARE_LOADING,
    isLoading
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

export function postsAreLoading (isLoading) {
  return {
    type: POSTS_ARE_LOADING,
    isLoading
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
