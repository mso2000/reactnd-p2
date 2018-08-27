import * as ServerAPI from '../utils/ServerAPI'

export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const CATEGORIES_ARE_LOADING = 'CATEGORIES_ARE_LOADING'
export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const SELECT_SORT_ORDER = 'SELECT_SORT_ORDER'
export const ADD_ALL_POSTS = 'ADD_ALL_POSTS'
export const POSTS_ARE_LOADING = 'POSTS_ARE_LOADING'
export const ADD_POST = 'ADD_POST'
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

export function addNewPost(post) {
  return (dispatch) => {
    dispatch(addPost(post))

    ServerAPI.addPost(post)
    .then(res => {
      if(!res.hasOwnProperty('id')){
        console.log('Insertion error. Rolling back changes...')
        dispatch(deletePost(post))
      }
    })
    .catch(error => {
      console.log(`Server error: ${error}.\n\nRolling back changes...`)
      dispatch(deletePost(post))
    })
  }
}

export function removePost(post) {
  return (dispatch) => {
    dispatch(deletePost(post))

    ServerAPI.deletePost(post)
    .then(res => {
      if(res.hasOwnProperty('error')){
        console.log('Delete error. Rolling back changes...')
        dispatch(addPost(post))
      }
    })
    .catch(error => {
      console.log(`Server error: ${error}.\n\nRolling back changes...`)
      dispatch(addPost(post))
    })
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
    type: ADD_ALL_POSTS,
    posts
  }
}

export function postsAreLoading (isLoading) {
  return {
    type: POSTS_ARE_LOADING,
    isLoading
  }
}

export function addPost (post) {
  return {
    type: ADD_POST,
    post
  }
}

export function deletePost (post) {
  return {
    type: DELETE_POST,
    post
  }
}
