export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const ADD_POSTS = 'ADD_POSTS'
export const ADD_NEW_POST = 'ADD_NEW_POST'
export const DELETE_POST = 'DELETE_POST'

export function addAllCategories (categories) {
  return {
    type: ADD_CATEGORIES,
    categories
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
